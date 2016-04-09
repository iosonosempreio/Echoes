


function generate_cluster_net(container_id) {


    var width = $("#" + container_id).width(), // svg width
        height = $("#" + container_id).height(), // svg height
        dr = 4, // default point radius
        off = 15, // cluster hull offset
        expand = {}, // expanded clusters
        data, net, force, hullg, hull, linkg, link, nodeg, node;

    var curve = d3.svg.line()
        .interpolate("cardinal-closed")
        .tension(.85);
    var fill = d3.scale.category20();

    function noop() {
        return false;
    }

    function nodeid(n) {
        return n.size ? "_g_" + n.group : n.name;
    }

    function linkid(l) {
        var u = nodeid(l.source),
            v = nodeid(l.target);
        return u < v ? u + "|" + v : v + "|" + u;
    }

    function getGroup(n) {
        return n.group;
    }

    // constructs the network to visualize
    function network(data, prev, index, expand) {
        expand = expand || {};
        var gm = {}, // group map
            nm = {}, // node map
            lm = {}, // link map
            gn = {}, // previous group nodes
            gc = {}, // previous group centroids
            nodes = [], // output nodes
            links = []; // output links

        // process previous nodes for reuse or centroid calculation
        if (prev) {
            prev.nodes.forEach(function(n) {
                //if (n.linked){
                var i = index(n),
                    o;
                if (n.size > 0) {
                    gn[i] = n;
                    n.size = 0;
                } else {
                    o = gc[i] || (gc[i] = {
                        x: 0,
                        y: 0,
                        count: 0
                    });
                    o.x += n.x;
                    o.y += n.y;
                    o.count += 1;
                }
                //}
            });
        }

        // determine nodes
        for (var k = 0; k < data.nodes.length; ++k) {
            if (data.nodes[k].linked) {
                var n = data.nodes[k],
                    i = index(n),
                    l = gm[i] || (gm[i] = gn[i]) || (gm[i] = {
                        group: i,
                        size: 0,
                        nodes: []
                    });

                if (expand[i]) {
                    // the node should be directly visible
                    nm[n.name] = nodes.length;
                    nodes.push(n);
                    if (gn[i]) {
                        // place new nodes at cluster location (plus jitter)
                        n.x = gn[i].x + Math.random();
                        n.y = gn[i].y + Math.random();
                    }
                } else {
                    // the node is part of a collapsed cluster
                    if (l.size == 0) {
                        // if new cluster, add to set and position at centroid of leaf nodes
                        nm[i] = nodes.length;
                        nodes.push(l);
                        if (gc[i]) {
                            l.x = gc[i].x / gc[i].count;
                            l.y = gc[i].y / gc[i].count;
                        }
                    }
                    l.nodes.push(n);
                }

                // always count group size as we also use it to tweak the force graph strengths/distances
                l.size += 1;
                n.group_data = l;
            }
        }

        for (i in gm) {
            gm[i].link_count = 0;
        }

        // determine links
        for (k = 0; k < data.links.length; ++k) {
            var e = data.links[k],
                u = index(e.source),
                v = index(e.target);
            if (u != v) {
                gm[u].link_count++;
                gm[v].link_count++;
            }


            u = expand[u] ? nm[e.source.name] : nm[u];
            v = expand[v] ? nm[e.target.name] : nm[v];
            var i = (u < v ? u + "|" + v : v + "|" + u),
                l = lm[i] || (lm[i] = {
                    source: u,
                    target: v,
                    size: 0
                });
            l.size += 1;





        }
        for (i in lm) {
            links.push(lm[i]);
        }

        return {
            nodes: nodes,
            links: links
        };
    }

    function convexHulls(nodes, index, offset) {
        var hulls = {};

        // create point sets
        for (var k = 0; k < nodes.length; ++k) {
            var n = nodes[k];
            if (n.size) continue;
            var i = index(n),
                l = hulls[i] || (hulls[i] = []);
            l.push([n.x - offset, n.y - offset]);
            l.push([n.x - offset, n.y + offset]);
            l.push([n.x + offset, n.y - offset]);
            l.push([n.x + offset, n.y + offset]);
        }

        // create convex hulls
        var hullset = [];
        for (i in hulls) {
            hullset.push({
                group: i,
                path: d3.geom.hull(hulls[i])
            });
        }

        return hullset;
    }

    function drawCluster(d) {
        return curve(d.path); // 0.8
    }

    // --------------------------------------------------------

    var g;

    function zoom() {
        g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }


    var body = d3.select("#network_container");

    var vis = body.append("svg").attr('id', 'd3clusters').attr("viewBox", "0 0 " + width + " " + height).attr("preserveAspectRatio", "xMidYMid meet").call(d3.behavior.zoom().scaleExtent([-4, 8]).on("zoom", zoom)).on("dblclick.zoom", null);
    g = vis.append('g').attr('id', 'viewport');


    var group_ids = [];

    var all_the_links = [];
    var unique_correspondant = [];

    d3.json("clusters.json", function(json) {
        data = json;
        for (var i = 0; i < data.links.length; ++i) {
          
            o = data.links[i];
           
            
            o.source = data.nodes[o.source];
            o.target = data.nodes[o.target];
        }

        hullg = g.append("g");
        linkg = g.append("g");
        nodeg = g.append("g");

        init();

        vis.attr("opacity", 1e-6)
            .transition()
            .duration(1000)
            .attr("opacity", 1);
    });

    function init() {
        if (force) force.stop();

        net = network(data, net, getGroup, expand);

        force = d3.layout.force()
            .nodes(net.nodes)
            .links(net.links)
            .size([width, height])
            .charge(-800)
            .linkDistance(function(l, i) {
                var n1 = l.source,
                    n2 = l.target;
               return 30 +
                    Math.min(20 * Math.min((n1.size || (n1.group != n2.group ? n1.group_data.size : 0)), (n2.size || (n1.group != n2.group ? n2.group_data.size : 0))), -30 +
                        30 * Math.min((n1.link_count || (n1.group != n2.group ? n1.group_data.link_count : 0)), (n2.link_count || (n1.group != n2.group ? n2.group_data.link_count : 0))),
                        100);
            })

        .linkStrength(function(l, i) {
            return 1;
        })
            .start();
        hullg.selectAll("path.hull").remove();
        hull = hullg.selectAll("path.hull")
            .data(convexHulls(net.nodes, getGroup, off))
            .enter().append("path")
            .attr("class", "hull")
            .attr("d", drawCluster)
            .style("fill", "#c6c6c6")
            .on("click", function(d) {
                expand[d.group] = false;

                $("#containerDiv").css("background-color", "transparent");
                $("#containerDiv").html("");
                d3.select("#d3authors").remove();

                $("#mini_authors").html("");
                init();
            });
        link = linkg.selectAll("line.link").data(net.links, linkid);
        link.exit().remove();
        link.enter().append("line")
            .attr("class", "link")
            .attr("x1", function(d) {
                return d.source.x;
            })
            .attr("y1", function(d) {
                return d.source.y;
            })
            .attr("x2", function(d) {
                return d.target.x;
            })
            .attr("y2", function(d) {
                return d.target.y;
            })
            .style("stroke-width", function(d) {
                return 1;
            });


        var max_links_number = 20;


        node = nodeg.selectAll("g").data(net.nodes, nodeid);
        node.exit().remove();




        var gpol = node.enter()
            .append("g")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";

            }).append("polygon");








        gpol.attr("points", function(d) {
            if (d.nodes != undefined){
            d.nodes.forEach(function(s){
               var cor_link = {};

                var sourcetargetconc = s.author + s.recipient;
                 if (!_.contains(unique_correspondant, sourcetargetconc)) {
                     cor_link.source=s.author;
                     cor_link.target=s.recipient;
                     cor_link.type="resolved";
                     all_the_links.push(cor_link);
                     unique_correspondant.push(sourcetargetconc);
                 }
               

              

            });
            }
            if (d.size > 0) {
                //console.log(d.link_count);
                if (d.size >= 0 && d.size < 4) {
                    return "14.5,1 28.1,24.6 0.9,24.6";
                } else if (d.size >= 4 && d.size < 6) {
                    return "26,11.2 26,36.7 0.5,36.7 0.5,11.2";
                } else if (d.size >= 6 && d.size < 9) {
                    return "13.5,0.6 26.4,10 21.5,25.2 5.5,25.2 0.6,10 ";
                } else {
                    return "7.8,0.5 18.2,0.5 25.5,7.8 25.5,18.2 18.2,25.5 7.8,25.5 0.5,18.2 0.5,7.8";
                }
            } else {
                return "7.5,0 7.8,0 8.2,0 8.5,0.1 8.9,0.1 9.2,0.2 9.6,0.3 9.9,0.4 10.2,0.5 10.5,0.6 10.8,0.8 11.1,0.9 11.4,1.1 11.7,1.3 12,1.5 12.3,1.7 12.6,2 12.8,2.2 13,2.4 13.3,2.7 13.5,3 13.7,3.3 13.9,3.6 14.1,3.9 14.2,4.2 14.4,4.5 14.5,4.8 14.6,5.1 14.7,5.4 14.8,5.8 14.9,6.1 14.9,6.5 15,6.8 15,7.2 15,7.5 15,7.8 15,8.2 14.9,8.5 14.9,8.9 14.8,9.2 14.7,9.6 14.6,9.9 14.5,10.2 14.4,10.5 14.2,10.8 14.1,11.1 13.9,11.4 13.7,11.7 13.5,12 13.3,12.3 13,12.6 12.8,12.8 12.6,13 12.3,13.3 12,13.5 11.7,13.7 11.4,13.9 11.1,14.1 10.8,14.2 10.5,14.4 10.2,14.5 9.9,14.6 9.6,14.7 9.2,14.8 8.9,14.9 8.5,14.9 8.2,15 7.8,15 7.5,15 7.2,15 6.8,15 6.5,14.9 6.1,14.9 5.8,14.8 5.4,14.7 5.1,14.6 4.8,14.5 4.5,14.4 4.2,14.2 3.9,14.1 3.6,13.9 3.3,13.7 3,13.5 2.7,13.3 2.4,13 2.2,12.8 2,12.6 1.7,12.3 1.5,12 1.3,11.7 1.1,11.4 0.9,11.1 0.8,10.8 0.6,10.5 0.5,10.2 0.4,9.9 0.3,9.6 0.2,9.2 0.1,8.9 0.1,8.5 0,8.2 0,7.8 0,7.5 0,7.2 0,6.8 0.1,6.5 0.1,6.1 0.2,5.8 0.3,5.4 0.4,5.1 0.5,4.8 0.6,4.5 0.8,4.2 0.9,3.9 1.1,3.6 1.3,3.3 1.5,3 1.7,2.7 2,2.4 2.2,2.2 2.4,2 2.7,1.7 3,1.5 3.3,1.3 3.6,1.1 3.9,0.9 4.2,0.8 4.5,0.6 4.8,0.5 5.1,0.4 5.4,0.3 5.8,0.2 6.1,0.1 6.5,0.1 6.8,0 7.2,0";
            }

        }).style("fill", function(d) {

            group_ids.push(d.group);
            if (d.label != undefined) {
                return fill(d.author);
            } else {
                return '#c06a6a';
            }

        }).style("stroke", function(d) {
            if (d.label != undefined) {
                return fill(d.recipient);
            } else {
                return '#d5a09c';
            }
        }).style("stroke-width", function(d) {
            return '2px';
        })
            .on("click", function(d) {
                d3.select("#d3authors").remove();

                $("#containerDiv").html("");
                $("#mini_authors").html("");


                var colors_for_tarviz = [];
                var traviz_data = [];
                var unique_ids = [];


                var auth_links = [];


                if (d.nodes != undefined) {
                    d.nodes.forEach(function(elm) {
                        var auth_letter = {};

                        elm.edition = elm.name;
                        elm.text = elm.label;
                        elm.color = fill(elm.author);

                        if (!_.contains(unique_ids, elm.name)) {
                            auth_letter.source = elm.author;
                            auth_letter.target = elm.recipient;
                            auth_letter.type = "resolved";
                            auth_links.push(auth_letter);

                            unique_ids.push(elm.name);
                            colors_for_tarviz.push(fill(elm.author));
                            traviz_data.push(elm);
                        }

                    });
                    generate_authors_net("mini_authors", auth_links);


                                   
                    generate_correspondent_net("correspondant_network",auth_links);

                    $("#containerDiv").css("background-color", "#ffffff")
                    var traviz = new TRAViz("containerDiv", {
                        colors: colors_for_tarviz, // colors used to identify the various edition paths    
                        lineBreaks: false, // if line breaks are allowed or not (if true, only the width of the given div is used)      
                        baseColor: '#4d4d4d', // color used for text and joined connections    
                        vertexBackground: '#F2F2F2', // false or a CSS color for the text backgrounds      
                        font: 'OpenSans', // text font      
                        startAndEnd: false, // if start and end vertex are shown and linked to all paths
                        collapseLabels: 0, // text labels are only shown for vertices with more than the given value
                        interpolateFontSize: true, // if true, the font size of the vertices is interpolated
                        fontSizeMin: 10, // minimum font size
                        fontSizeMax: 24, // maximum font size
                        fontSizeIncrease: 4, // the number of pixels the labels grow by edition if interpolateFontSize = false
                        edgeGap: 5, // minimum gap between two connections; required when adjusting the connections horizontally and vertically    
                        curveRadius: 10
                    });


                    traviz.align(traviz_data);
                    traviz.visualize();
                }


                group_ids.forEach(function(h) {
                    expand[h] = false;
                });


                expand[d.group] = !expand[d.group];
                init();
            });

        node.call(force.drag);

        force.on("tick", function() {
            if (!hull.empty()) {
                hull.data(convexHulls(net.nodes, getGroup, off))
                    .attr("d", drawCluster);
            }

            link.attr("x1", function(d) {
                return d.source.x;
            })
                .attr("y1", function(d) {
                    return d.source.y;
                })
                .attr("x2", function(d) {
                    return d.target.x;
                })
                .attr("y2", function(d) {
                    return d.target.y;
                });


            node.attr("transform", function(d) {
                return "translate(" + (d.x - (d.size ? 10 : 8)) + "," + (d.y - (d.size ? 15 : 8)) + ")";
            })


        });
    }
}