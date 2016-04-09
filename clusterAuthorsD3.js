function generate_authors_net(container_id,data_authors) {



var fill = d3.scale.category20();

$("#"+container_id).html("");

var links = data_authors;

var nodes = {};

links.forEach(function(link) {
  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
});

var width = $("#" + container_id).width(),
    height = 300 ;

var force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([width, height])
    .charge(-800)
   	.distance(150)
    .on("tick", tick)
    .start();


  var body = d3.select("#"+container_id);

    var svg = body.append("svg").attr('id', 'd3authors').attr("viewBox", "0 0 " + width + " " + height).attr("preserveAspectRatio", "xMidYMid meet").call(d3.behavior.zoom().scaleExtent([-4, 8]).on("zoom", zoom)).on("dblclick.zoom", null).append('g').attr('id', 'viewport_authors');




// Per-type markers, as they don't inherit styles.
svg.append("defs").selectAll("marker")
    .data(["suit", "licensing", "resolved"])
  .enter().append("marker")
    .attr("id", function(d) { return d; })
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -1.5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
  .append("path")
    .attr("d", "M0,-5L10,0L0,5");

var path = svg.append("g").selectAll("path")
    .data(force.links())
  .enter().append("path")
    .attr("class", function(d) { return "link " + d.type; })
    .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });

var circle = svg.append("g").selectAll("circle")
    .data(force.nodes())
    .enter().append("circle")
    .attr("r", 6)
    .style("fill",function(d){
        return fill(d.name);
    })
    .call(force.drag);

var text = svg.append("g").selectAll("text")
    .data(force.nodes())
  .enter().append("text")
    .attr("x", 8)
    .attr("y", ".31em")
    .text(function(d) { return d.name.split(".")[1]+ " "+ d.name.split(".")[0]; });

// Use elliptical arc path segments to doubly-encode directionality.
function tick() {
  path.attr("d", linkArc);
  circle.attr("transform", transform);
  text.attr("transform", transform);
}

function linkArc(d) {
  var dx = d.target.x - d.source.x,
      dy = d.target.y - d.source.y,
      dr = Math.sqrt(dx * dx + dy * dy);
  return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
}

function transform(d) {
  return "translate(" + d.x + "," + d.y + ")";
}

    function zoom() {
        svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }



}










function generate_correspondent_net(container_id,data_link) {

var authors = [];


data_link.forEach(function(s){


	authors.push(s.source.name);
	authors.push(s.target.name);


	authors.push(s.source);
	authors.push(s.target);

});

console.log(authors);

var links = [
  {
    "source": "groot.hugo.1583-1645",
    "target": "meursius.johannes.1579-1639",
    "type": "resolved"
  },
  {
    "source": "pontanus.johannes-isacus.1571-1639",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "bourbon.henri-ii.1588-1648",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "thou.jacques-auguste.1553-1617",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "venetie.bestuur-inwoners",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "holland-staten",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "lipsius.justus.1547-1606",
    "type": "resolved"
  },
  {
    "source": "lipsius.justus.1547-1606",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "thou.jacques-auguste.1553-1617",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "lefevre.nicolas.fl.1602",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "casaubonus.isaac.1559-1614",
    "type": "resolved"
  },
  {
    "source": "gruter.janus.1560-1627",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "heinsius.daniel.1580-1655",
    "type": "resolved"
  },
  {
    "source": "casaubonus.isaac.1559-1614",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "uytenbogaert.johannes.1557-1644",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "bertius.petrus.1565-1629",
    "type": "resolved"
  },
  {
    "source": "baudius.dominicus.1561-1613",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "lingelsheim.georg-michael.1556-1636",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "jungermann.gottfried.1577-1610",
    "type": "resolved"
  },
  {
    "source": "casaubonus.isaac.1559-1614",
    "target": "scriverius.petrus.1576-1660",
    "type": "resolved"
  },
  {
    "source": "lingelsheim.georg-michael.1556-1636",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "grootenhuys.jan.1573-1646",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "merula.paullus.1558-1607",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "raphelengius.franciscus.1568-1643",
    "type": "resolved"
  },
  {
    "source": "heinsius.daniel.1580-1655",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "radermacher.johan.1538-1617",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "rutgersius.janus.1589-1625",
    "type": "resolved"
  },
  {
    "source": "beaumont.simon.1574-1654",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "does.dirk.1580-1630",
    "type": "resolved"
  },
  {
    "source": "gruter.jacobus.-1607",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "scriverius.petrus.1576-1660",
    "type": "resolved"
  },
  {
    "source": "blyenburg.adriaan.1589-1630",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "vigier.aej.fl.1608",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "boreel.johan.1577-1629",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "groot.johan-hugo.1554-1640",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "reigersberch.nicolaas.1584-1654",
    "type": "resolved"
  },
  {
    "source": "meyros.nicolaes.1588-",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "miraeus.aubertus.1573-1640",
    "type": "resolved"
  },
  {
    "source": "hornes.maximiliaan.fl.1609",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "jansonius.jacobus.1547-1625",
    "target": "miraeus.aubertus.1573-1640",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "gruter.janus.1560-1627",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "jeannin.pierre.1541-1623",
    "type": "resolved"
  },
  {
    "source": "rutgersius.janus.1589-1625",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "boreel.willem.1591-1668",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "pijnacker.cornelis.1570-1645",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "bertius.petrus.1565-1629",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "gomarus.franciscus.1563-1641",
    "type": "resolved"
  },
  {
    "source": "cunaeus.petrus.1586-1638",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "sande.johan.1568-1638",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "walaeus.antonius.1573-1639",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "walaeus.antonius.1573-1639",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "schotte.apollonius.1574-1639",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "episcopius.simon.1583-1643",
    "type": "resolved"
  },
  {
    "source": "overall.john.1560-1619",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "uytenbogaert.johannes.1557-1644",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "vossius.gerardus-johannes.1577-1649",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "mijl.abraham.1563-1637",
    "type": "resolved"
  },
  {
    "source": "erpe.thomas.1584-1624",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "vossius.gerardus-johannes.1577-1649",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "mijl.abraham.1563-1637",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "sande.frederick.1577-1617",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "groot.willem.1597-1662",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "aubery-maurier.benjamin.1566-1636",
    "type": "resolved"
  },
  {
    "source": "arcerius.paulus.fl.1597-1614",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "thorius.raphael.1560-1625",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "hotman-villiers.jean.1552-1636",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "polyander-kerckhoven.johannes.1568-1646",
    "type": "resolved"
  },
  {
    "source": "sande.frederick.1577-1617",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "episcopius.simon.1583-1643",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "lasson.jacobus.-1662",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "aubery-maurier.benjamin.1566-1636",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "scriverius.petrus.1576-1660",
    "target": "groot.hugo.1583-1645heinsius.daniel.1580-1655",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "aubery-maurier.louis.1609-1687",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "vorstius.conradus.1569-1622",
    "type": "resolved"
  },
  {
    "source": "bouricius.hector.1593-1636",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "bingham.john.fl.1615",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "pontanus.johannes-isacus.1571-1639",
    "type": "resolved"
  },
  {
    "source": "stampelius.georg.fl.1616",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "vosbergen.johan.fl.1616-1625",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "cunaeus.petrus.1586-1638",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "overall.john.1560-1619",
    "type": "resolved"
  },
  {
    "source": "rigault.nicolas.1577-1654",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "graswinckel.dirck.1601-1666",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "winsemius.pier.1586-1644",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "polyander-kerckhoven.johannes.1568-1646",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "gevaerts.jan-caspar.1593-1666",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "huygens.constantijn.1596-1687",
    "target": "huygens.christiaan.1551-1624",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "boetzelaer.gideon.1569-1634",
    "type": "resolved"
  },
  {
    "source": "myle.cornelis.1579-1642groot.hugo.1583-1645",
    "target": "heinsius.daniel.1580-1655",
    "type": "resolved"
  },
  {
    "source": "groot.johan-hugo.1554-1640",
    "target": "groot.willem.1597-1662",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "dominis.marco-antonio.1560-1624",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "gevaerts.jan-caspar.1593-1666",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "elmenhorst.gerhardus.1580-1621",
    "type": "resolved"
  },
  {
    "source": "elmenhorst.gerhardus.1580-1621",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "delmanhorst.hendrik.1575-1640",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "aitzema.foppe.1580-1637",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "hooft.pieter-cornelisz.1581-1647",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "episcopius.simon.1583-1643",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "remonstrantes-fratres",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "andrewes.lancelot.1555-1626",
    "type": "resolved"
  },
  {
    "source": "groot.willem.1597-1662",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "huygens.constantijn.1596-1687",
    "target": "heinsius.daniel.1580-1655",
    "type": "resolved"
  },
  {
    "source": "groot.willem.1597-1662",
    "target": "graswinckel.dirck.1601-1666",
    "type": "resolved"
  },
  {
    "source": "wouwer.johan.1578-1635",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "staten-generaal",
    "type": "resolved"
  },
  {
    "source": "jeannin.pierre.1541-1623",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "puteanus.erycius.1574-1646",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "hemelarius.joannes.1570-1655",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "dupuy.jacques.1591-1656",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "dupuy.pierre.1582-1651",
    "type": "resolved"
  },
  {
    "source": "jacchaeus.gilbertus.1578-1628",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.johan-hugo.1554-1640",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "fabry-peiresc.nicolas-claude.1580-1637",
    "type": "resolved"
  },
  {
    "source": "schottus.andreas.1552-1629",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "thumery-boisise.jean-robert.-1621",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "vair.guillaume.1566-1621",
    "type": "resolved"
  },
  {
    "source": "cosin.john.1595-1672",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "schottus.andreas.1552-1629",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "hemelarius.joannes.1570-1655",
    "type": "resolved"
  },
  {
    "source": "sweertius.franciscus.1567-1629",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "sweertius.franciscus.1567-1629",
    "type": "resolved"
  },
  {
    "source": "bourgogne.nicolas.1586-1649",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "hogerbeets.adriaen.fl.1621-1644",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "saumaise.claude.1588-1653",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "junius.franciscus.1591-1677",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "junius.franciscus.1591-1677",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "bourgogne.nicolas.1586-1649",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "groot.johan-hugo.1554-1640groot.willem.1597-1662",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "sleeswijk-holstein-gottorp.frederik-iii.1597-1659",
    "type": "resolved"
  },
  {
    "source": "corvinus.johannes-arnoldi.1582-1650",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "lummenaeus-marca.jacobius-cornelius.1570-1629",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "zevecote.jacob.1596-1642",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "scriverius.petrus.1576-1660",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "hooft.henrik.1617-1678",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "mode.dirck.fl.1622",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "wren.christopher.1591-1658",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "brulart-sillery.nicolas.1544-1624",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "thou.francois-auguste.1607-1642",
    "type": "resolved"
  },
  {
    "source": "wiarda.dothias.1565-1637",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "aligre.etienne.1550-1635",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "nihus.barthold.1590-1657",
    "type": "resolved"
  },
  {
    "source": "nihus.barthold.1590-1657",
    "target": "barlaeus.caspar.1584-1648",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "guiscardi.trajano.-1639",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "petit.j.fl.1624-1642",
    "type": "resolved"
  },
  {
    "source": "brosterhuyzen.johan.1596-1650",
    "target": "huygens.constantijn.1596-1687",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "haestrecht.godefridus.1593-1659",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "narsius.johannes.1580-1637",
    "type": "resolved"
  },
  {
    "source": "cherbury.edward-herbert.1583-1648",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "huygens.constantijn.1596-1687",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "cherbury.edward-herbert.1583-1648",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "bor.pieter-christiaensz.1559-1635",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "bodaeus-stapel.johannes.fl.1625-1629",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "camerarius.joachim.1603-1687",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "heinsius.daniel.1580-1655",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "bor.johannes.fl.1625-1636",
    "type": "resolved"
  },
  {
    "source": "inthima.hero.1576-",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "wree.olivier.1596-1652",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "narsius.johannes.1580-1637",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "affelman.a.fl.1626",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "herbert.william.1580-1630",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "oldisworth.michael.1591-1654",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "hooft.pieter-cornelisz.1581-1647",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "wree.olivier.1596-1652",
    "type": "resolved"
  },
  {
    "source": "groot.cornelius.1613-1661",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "myle.cornelis.1579-1642",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "amama.sixtinus.1593-1629",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "jacchaeus.gilbertus.1578-1628",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "buchelius.arnoldus.1565-1641",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "hamey.baldwin.fl.1627",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "dominicus.abraham.fl.1627-1635",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "overbeke.matthijs.1584-1638",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "blyenburg.adriaan.1589-1630",
    "type": "resolved"
  },
  {
    "source": "wassenaer.gerard.1589-1664",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "quacq.cornelis.fl.1627",
    "type": "resolved"
  },
  {
    "source": "bignon.jerome.1589-1656",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "holstein.lucas.1596-1661",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "?",
    "target": "fra.louis-xiii.1601-1643",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "hooft.pieter-cornelisz.1581-1647",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "sarrau.claude.1600-1651",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "schoterbos.johannes.fl.1627-1628",
    "type": "resolved"
  },
  {
    "source": "ferdinand-ii.1578-1637",
    "target": "urbanus-viii.1568-1644",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "snecanus.daniel-johannes.fl.1628",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "holstein.lucas.1596-1661",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "assumius.johannes-christophorus.1581-1651",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "saumaise.claude.1588-1653",
    "type": "resolved"
  },
  {
    "source": "bernegger.matthias.1582-1640",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "bernegger.matthias.1582-1640",
    "type": "resolved"
  },
  {
    "source": "lansius.thomas.1577-1657",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "aitzema.foppe.1580-1637",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "mathenesse.johan.1596-1653",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "molino.domenico.1573-1635",
    "type": "resolved"
  },
  {
    "source": "romanus.adriano.fl.1628",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "aitzema.lieuwe.1600-1669",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "naaltwyck.p.fl.1628",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "barlaeus.caspar.1584-1648",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "schrevelius.theodorus.1572-1649",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "straten.j.fl.1628-1630",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "schickard.wilhelm.1592-1635",
    "type": "resolved"
  },
  {
    "source": "velge.nicolaus.fl.1629",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "honert.rochus.1572-1638",
    "type": "resolved"
  },
  {
    "source": "velden.willem-cornelisz.-1663",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "pontanus.johannes-isacus.1571-1639",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "cabeljauw.johan.1600-1652",
    "type": "resolved"
  },
  {
    "source": "beauclerc.charles.1560-1630",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "meiling.henricus.fl.1629",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "weymsius.petrus.-1657",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.willem.1597-1662",
    "target": "barlaeus.caspar.1584-1648",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "osdorp.f.fl.1629",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "schurman.johannes-godeschalk.1605-1664",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "brasser.w.fl.1629-1641",
    "type": "resolved"
  },
  {
    "source": "bergen.rutgerus.1603-1661",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "doublet.george-rataller.1600-1655",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "uytenbogaert.johannes.1557-1644",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "mesmes.henri.-1650",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "reigersberch.nicolaas.1584-1654",
    "type": "resolved"
  },
  {
    "source": "dorislaus.isaac.1595-1649",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "slupecki-konary.jerzy.1615-1661",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "slupecki-konary.jerzy.1615-1661",
    "type": "resolved"
  },
  {
    "source": "?",
    "target": "fabry-peiresc.nicolas-claude.1580-1637",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "gravius.theodorus.fl.1626-1630",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "opitz.martinus.1597-1639",
    "type": "resolved"
  },
  {
    "source": "ruarus.martinus.1588-1657",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "ruarus.martinus.1588-1657",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "crell.johann.1590-1633",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "polyander-kerckhoven.johannes.1568-1646",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "leeuwius.f.fl.1631",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "cunaeus.petrus.1586-1638",
    "type": "resolved"
  },
  {
    "source": "tabor.johann-otto.1604-1674",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "hunter.jacob-petrus.fl.1631",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "kinschot.lodewijk.1595-1647",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "conring.hermann.1606-1681",
    "type": "resolved"
  },
  {
    "source": "groot.willem.1597-1662",
    "target": "wicquefort.joachim.1600-1670",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "schrevelius.theodorus.1572-1649",
    "type": "resolved"
  },
  {
    "source": "huygens.constantijn.1596-1687",
    "target": "camerarius.ludwig.1573-1651",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "oetgens.anthony.1585-1658",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "niendaal.l.fl.1631",
    "type": "resolved"
  },
  {
    "source": "busius.cornelius.fl.1631",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "tilenus.daniel.1563-1633",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "schickard.wilhelm.1592-1635",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "huygens.constantijn.1596-1687",
    "target": "barlaeus.caspar.1584-1648",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "cordes.jean.1570-1642",
    "type": "resolved"
  },
  {
    "source": "beverwijck.johan.1594-1647",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "gassendi.pierre.1592-1655",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "arciszewski.krzysztof.1592-1656",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "gassendi.pierre.1592-1655",
    "type": "resolved"
  },
  {
    "source": "lindenbrog.friedrich.1573-1648",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "lusson.guillaume.fl.1632-1634",
    "type": "resolved"
  },
  {
    "source": "puteanus.erycius.1574-1646",
    "target": "huygens.constantijn.1596-1687",
    "type": "resolved"
  },
  {
    "source": "casaubonus.mericus.1599-1671",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "fabricius.vincentius.1612-1667",
    "type": "resolved"
  },
  {
    "source": "hartzwich.peter.fl.1632",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "ploos-amstel.adriaan.1585-1639",
    "type": "resolved"
  },
  {
    "source": "oxenstierna.axel.1583-1654",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "friesen.heinrich.1610-1680",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "oxenstierna.axel.1583-1654",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "tilenus.daniel.1563-1633",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "petit.samuel.1594-1643",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "dupuy.pierre.1582-1651dupuy.jacques.1591-1656",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "wicquefort.joachim.1600-1670",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "puteanus.erycius.1574-1646",
    "type": "resolved"
  },
  {
    "source": "muller.georg.-1639",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "fabricius.vincentius.1612-1667",
    "type": "resolved"
  },
  {
    "source": "witten.johan.-1645",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "oxenstierna.axel.1583-1654",
    "type": "resolved"
  },
  {
    "source": "beverwijck.johan.1594-1647",
    "target": "barlaeus.caspar.1584-1648",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "beveren.cornelis.1591-1663",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "beverwijck.johan.1594-1647",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "schagen.albert.fl.1633",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "cats.jacob.1577-1660",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "vorstius.adolphus.1597-1663",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "burgh.jacob.1599-1659",
    "type": "resolved"
  },
  {
    "source": "petit.samuel.1594-1643",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "pyll.jacob.1611-",
    "type": "resolved"
  },
  {
    "source": "gronovius.johannes-fredericus.1611-1671",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "gronovius.johannes-fredericus.1611-1671",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "gunther.f.fl.1634",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "myle.adriaan.fl.1638-1655",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "oxenstierna.johan-axelsson.1611-1657",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "arnisaeus.henning.1570-1636",
    "type": "resolved"
  },
  {
    "source": "skytte.johan.1577-1645",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "bignon.jerome.1589-1656",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "oxenstierna.johan-axelsson.1611-1657",
    "type": "resolved"
  },
  {
    "source": "heyling.peter.1607-1652",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "baugy.nicolas.-1640",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "cromhout.nicolaas.1561-1641",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "staeckmans.willem.1597-1641",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "schuyl.wijnand.1598-",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "nypoort.j.fl.1634",
    "type": "resolved"
  },
  {
    "source": "oxenstierna.axel.1583-1654",
    "target": "bourbon.louis.1604-1641bourbon.henri-ii.1588-1648",
    "type": "resolved"
  },
  {
    "source": "oxenstierna.axel.1583-1654",
    "target": "seguier.pierre.1588-1672",
    "type": "resolved"
  },
  {
    "source": "oxenstierna.axel.1583-1654",
    "target": "richelieu.1585-1642",
    "type": "resolved"
  },
  {
    "source": "oxenstierna.axel.1583-1654",
    "target": "orleans.gaston.1608-1660",
    "type": "resolved"
  },
  {
    "source": "oxenstierna.axel.1583-1654",
    "target": "fra.louis-xiii.1601-1643",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "schmalz.peter-abel.fl.1635-1638",
    "type": "resolved"
  },
  {
    "source": "?",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "camerarius.ludwig.1573-1651",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "skytte.johan.1577-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "swe.kristina.1626-1689",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "laud.william.1573-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "sprecher.fortunatus.1585-1647",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "witten.johan.-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "may.paul.1585-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "bouthillier.leon.1608-1652",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "grubbe.lars.1601-1642",
    "type": "resolved"
  },
  {
    "source": "oxenstierna.axel.1583-1654",
    "target": "bouthillier.leon.1608-1652",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "johnson.samson.1603-1661",
    "type": "resolved"
  },
  {
    "source": "johnson.samson.1603-1661",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "sarrau.claude.1600-1651",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "herberts.e.fl.1635",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "skytte.bengt.1614-1683",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "heyling.peter.1607-1652",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "colmar.bestuur",
    "type": "resolved"
  },
  {
    "source": "damcke.joachim.-1637",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "vagetius.heinrich.1587-1659",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "plempius.vopiscus-fortunatus.1601-1671",
    "type": "resolved"
  },
  {
    "source": "gruterus.isaac.1610-1680",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "cappel.louis.1585-1658",
    "type": "resolved"
  },
  {
    "source": "cappel.louis.1585-1658",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "vagetius.heinrich.1587-1659",
    "type": "resolved"
  },
  {
    "source": "groot.pieter.1615-1678",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "spanheim.friedrich.1600-1649",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "salvius.johan-adler.1590-1652",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "brahe.per.1602-1680",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "groot.cornelius.1613-1661",
    "type": "resolved"
  },
  {
    "source": "swe.kristina.1626-1689",
    "target": "fra.louis-xiii.1601-1643",
    "type": "resolved"
  },
  {
    "source": "swe.kristina.1626-1689",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "saksen-weimar.bernhard.1604-1639",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "vossius.matthaeus.1610-1646",
    "type": "resolved"
  },
  {
    "source": "voisin.joseph.1610-1685",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "salvius.johan-adler.1590-1652",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "beauharnais.francois.-1651",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "orleans.bestuur-duitse-natie",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "damcke.bernhard.1613-1656",
    "type": "resolved"
  },
  {
    "source": "damcke.bernhard.1613-1656",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "voisin.joseph.1610-1685",
    "type": "resolved"
  },
  {
    "source": "orleans.bestuur-duitse-natie",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "lampadius.jacob.1593-1649",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "gersdorff-tundbyholm.joachim.1611-1661",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "veen.c.fl.1636",
    "type": "resolved"
  },
  {
    "source": "oxenstierna.axel.1583-1654",
    "target": "chevrieres.melchior-mitte.1586-1649",
    "type": "resolved"
  },
  {
    "source": "friesen.heinrich.1610-1680",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "graswinckel.dirck.1601-1666",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "casaubonus.mericus.1599-1671",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "bielke.sten.1598-1638",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "helmont.j.fl.1636-1639",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "galilei.galileo.1564-1642",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "schuyl.p.fl.1636",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "lindenbrog.friedrich.1573-1648",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "lampadius.jacob.1593-1649",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "conring.hermann.1606-1681",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "calixtus.georg.1586-1656",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "hortensius.martinus.1605-1639",
    "type": "resolved"
  },
  {
    "source": "bielke.sten.1598-1638",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "huygens.constantijn.1596-1687",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "johnston.a.fl.1637",
    "type": "resolved"
  },
  {
    "source": "gersdorff-tundbyholm.joachim.1611-1661",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "vogler.hieronymus.1565-1642",
    "type": "resolved"
  },
  {
    "source": "schmalz.peter-abel.fl.1635-1638",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot-kraayenburg.dirck.1618-1661",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "aubery-maurier.louis.1609-1687",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "eeden.h.fl.1637",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "boyus.c.fl.1637-1641",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "conrad.andreas.fl.1637",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "forstner.christoph.1598-1667",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "durie.john.1596-1680",
    "type": "resolved"
  },
  {
    "source": "empereur.constantijn.1591-1648",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "reigersberch.johan.1613-1666",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "hopfner.heinrich.1583-1642",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "reigersberch.johan.1613-1666",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "frischmann.johann.1612-1680",
    "type": "resolved"
  },
  {
    "source": "huygens.constantijn.1596-1687",
    "target": "reneri.henricus.1593-1639",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "hopfner.heinrich.1583-1642",
    "type": "resolved"
  },
  {
    "source": "swe.kristina.1626-1689",
    "target": "richelieu.1585-1642",
    "type": "resolved"
  },
  {
    "source": "oxenstierna.axel.1583-1654",
    "target": "joseph.pere.1577-1638",
    "type": "resolved"
  },
  {
    "source": "swe.kristina.1626-1689",
    "target": "mesmes.claude.1595-1650",
    "type": "resolved"
  },
  {
    "source": "swe.kristina.1626-1689",
    "target": "bouthillier.leon.1608-1652sublet-noyers.francois.1589-1645",
    "type": "resolved"
  },
  {
    "source": "swe.kristina.1626-1689",
    "target": "erizzo.francesco.1566-1646",
    "type": "resolved"
  },
  {
    "source": "swe.kristina.1626-1689",
    "target": "pesaro.giovanni.1568-1659",
    "type": "resolved"
  },
  {
    "source": "swe.kristina.1626-1689",
    "target": "bullion.claude.-1640bouthillier.claude.1581-1652",
    "type": "resolved"
  },
  {
    "source": "swe.kristina.1626-1689",
    "target": "saksen-weimar.bernhard.1604-1639",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "muller.georg.-1639",
    "type": "resolved"
  },
  {
    "source": "freinsheim.johann.1608-1660",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "camerarius.ludwig.1573-1651",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "kruus.johan-jespersson.1614-1644",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "bisterfeld.johann-heinrich.1605-1655",
    "target": "oxenstierna.axel.1583-1654",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "corvinus.johannes-arnoldi.1582-1650",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "freinsheim.johann.1608-1660",
    "type": "resolved"
  },
  {
    "source": "andersson.samuel.fl.1638",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "groot-kraayenburg.dirck.1618-1661",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "groot.pieter.1615-1678",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "andersson.samuel.fl.1638",
    "type": "resolved"
  },
  {
    "source": "jaski.israel.1573-1642",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "empereur.constantijn.1591-1648",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "stoinski.jan.-1654",
    "type": "resolved"
  },
  {
    "source": "cassius.christian.1609-1676",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "jaski.israel.1573-1642",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "cassius.christian.1609-1676",
    "type": "resolved"
  },
  {
    "source": "huygens.constantijn.1596-1687",
    "target": "huygens.constantijn.1628-1697huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "bernegger.matthias.1582-1640freinsheim.johann.1608-1660",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "pfalz.karl-ludwig.1617-1680",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "goffe.stephen.1605-1681",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "gardie.jacob-pontusson.1583-1652",
    "type": "resolved"
  },
  {
    "source": "appelboom.harald.1612-1674",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "appelboom.harald.1612-1674",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "salm-kyrburg.johann-kasimir.1577-1651",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "spanheim.friedrich.1600-1649",
    "type": "resolved"
  },
  {
    "source": "foreest.jan.1586-1651",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "deichmann.christoph.1576-1648",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "bruno.henrick.1617-1664",
    "target": "huygens.constantijn.1596-1687",
    "type": "resolved"
  },
  {
    "source": "vossius.gerardus.1610-1640",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "vossius.isaac.1618-1689",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "saksen-weimar.bernhard.1604-1639",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "oxenstierna.gabriel-gustavsson.1587-1640",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "niendaal.g.fl.1639-1642",
    "type": "resolved"
  },
  {
    "source": "mylonius-biorenklou.matthias.1617-1671",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "vossius.isaac.1618-1689",
    "type": "resolved"
  },
  {
    "source": "groot.willem.1597-1662groot.johan-hugo.1554-1640",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "lagerfelt.israel.1610-1684",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "neuhusius.r.fl.1639-1642",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "vossius.gerardus.1610-1640",
    "type": "resolved"
  },
  {
    "source": "rosenhane.gustaf.1619-1684",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "israel.menasse.1604-1657",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "baner.johan.1596-1641",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "wicquefort.joachim.1600-1670",
    "type": "resolved"
  },
  {
    "source": "turner.matthias.fl.1639",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "oxenstierna.gabriel-gabrielsson.1618-1647",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "rosenhane.gustaf.1619-1684",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "justiniani.g.fl.1639",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "gulichius.g.fl.1640",
    "type": "resolved"
  },
  {
    "source": "saksen-weimar.wilhelm-ii.1598-1662",
    "target": "swe.kristina.1626-1689",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "boreel.willem.1591-1668",
    "type": "resolved"
  },
  {
    "source": "nothafft.johann-heinrich.1604-1665",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "schonck.daniel.1612-1668",
    "type": "resolved"
  },
  {
    "source": "courcelles.etienne.1586-1659",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "scudamore.john.1601-1671",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "courcelles.etienne.1586-1659",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "dorislaus.isaac.1595-1649",
    "type": "resolved"
  },
  {
    "source": "huygens.constantijn.1596-1687",
    "target": "bruno.henrick.1617-1664",
    "type": "resolved"
  },
  {
    "source": "huygens.constantijn.1596-1687",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "lautereck.leopold-ludwig.1625-1694",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "hogerbeets.adriaen.fl.1621-1644",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "petau.denis.1583-1652",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "mylonius-biorenklou.matthias.1617-1671",
    "type": "resolved"
  },
  {
    "source": "pels.pieter.1617-1698",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "horn.gustav.1592-1657",
    "type": "resolved"
  },
  {
    "source": "oxenstierna.johan-axelsson.1611-1657",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "vinnius.arnoldus.1588-1657",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "stella.johannes-tilmannus.-1645",
    "type": "resolved"
  },
  {
    "source": "richelieu.1585-1642",
    "target": "barlaeus.caspar.1584-1648",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "scott-of-scotstarvet.john.1585-1670",
    "type": "resolved"
  },
  {
    "source": "bode.gerardus.fl.1637-1642",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "rosenhane.schering.1609-1663",
    "type": "resolved"
  },
  {
    "source": "meursius.johannes.1613-1654",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "bode.gerardus.fl.1637-1642",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "richelieu.1585-1642",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "laurentius.jacobus.1585-1644",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "meursius.johannes.1613-1654",
    "type": "resolved"
  },
  {
    "source": "sorbiere.samuel.1615-1670",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "gardie.jacob-pontusson.1583-1652",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "groot.willem.1597-1662",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "danckelman.sylvester.1601-1679",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "zas.j.fl.1642",
    "type": "resolved"
  },
  {
    "source": "aitzema.lieuwe.1600-1669",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "aitzema.lieuwe.1600-1669",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "goddaeus.conradus.1612-1658",
    "type": "resolved"
  },
  {
    "source": "comte.robert.fl.1643",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "brandenburg.friedrich-wilhelm.1620-1688",
    "target": "oxenstierna.johan-axelsson.1611-1657",
    "type": "resolved"
  },
  {
    "source": "swe.kristina.1626-1689",
    "target": "pfalz.karl-ludwig.1617-1680",
    "type": "resolved"
  },
  {
    "source": "swe.kristina.1626-1689",
    "target": "fra.louis-xiv.1638-1715",
    "type": "resolved"
  },
  {
    "source": "swe.kristina.1626-1689",
    "target": "camerarius.joachim.1603-1687",
    "type": "resolved"
  },
  {
    "source": "swe.kristina.1626-1689",
    "target": "oostenrijk.anna.1601-1666",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "emporagrius.erik-gabrielsson.1606-1674",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "verulanus.p.fl.1643",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "torstensson.lennart.1603-1651",
    "type": "resolved"
  },
  {
    "source": "swe.kristina.1626-1689",
    "target": "mazarin.jules.1602-1661",
    "type": "resolved"
  },
  {
    "source": "oxenstierna.axel.1583-1654",
    "target": "mazarin.jules.1602-1661",
    "type": "resolved"
  },
  {
    "source": "stalhandske.johan.fl.1643",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "salvius.johan-adler.1590-1652",
    "target": "mazarin.jules.1602-1661",
    "type": "resolved"
  },
  {
    "source": "ruarus.martinus.1588-1657",
    "target": "pels.paulus.1587-1659",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "salis-marschlins.ulysse.1594-1674",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "westerbaen.jacob.1599-1670",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "hessen-eschwege.friedrich.1617-1655",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "stalhandske.johan.fl.1643",
    "type": "resolved"
  },
  {
    "source": "rosenhane.schering.1609-1663",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "hessen-eschwege.friedrich.1617-1655",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "kutner.georg-johann.-1667",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "bayern.maximilian-i.1573-1651",
    "type": "resolved"
  },
  {
    "source": "?",
    "target": "duncan-cerisantes.marc.1612-1648",
    "type": "resolved"
  },
  {
    "source": "swe.kristina.1626-1689",
    "target": "bouthillier.leon.1608-1652",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "balde.jacob.1604-1668",
    "type": "resolved"
  },
  {
    "source": "kutner.georg-johann.-1667",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "balde.jacob.1604-1668",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "gyllenstierna.sigismund.1598-1666",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "spanheim.friedrich.1600-1649",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "graswinckel.dirck.1601-1666",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "rigault.nicolas.1577-1654",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "ferents.thomas.-1647",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "groenewegen-made.simon.1613-1652",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "riccen.f.fl.1644",
    "type": "resolved"
  },
  {
    "source": "smetius.johannes.1590-1651",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "swe.kristina.1626-1689",
    "target": "duncan-cerisantes.marc.1612-1648",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "aiguebere.fl.1625-1645",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "oxenstierna.johan-axelsson.1611-1657salvius.johan-adler.1590-1652",
    "type": "resolved"
  },
  {
    "source": "huygens.constantijn.1596-1687",
    "target": "huygens.christiaan.1629-1695huygens.constantijn.1628-1697",
    "type": "resolved"
  },
  {
    "source": "bruno.henrick.1617-1664",
    "target": "huygens.christiaan.1629-1695huygens.constantijn.1628-1697",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "swe.karl-x-gustav.1622-1660",
    "type": "resolved"
  },
  {
    "source": "groot.hugo.1583-1645",
    "target": "gardie.magnus-gabriel.1622-1686",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "huygens.lodewijk.1631-1699",
    "type": "resolved"
  },
  {
    "source": "pricaeus.johannes.1600-1676",
    "target": "groot.hugo.1583-1645",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "rampers.j.fl.1646",
    "type": "resolved"
  },
  {
    "source": "renesse.lodewijk-gerard.1599-1671",
    "target": "huygens.constantijn.1596-1687",
    "type": "resolved"
  },
  {
    "source": "barlaeus.caspar.1584-1648",
    "target": "pandelaert.bernardus.1600-1653",
    "type": "resolved"
  },
  {
    "source": "wendelinus.godfried.1580-1667",
    "target": "huygens.constantijn.1596-1687",
    "type": "resolved"
  },
  {
    "source": "schooten.frans.1615-1660",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "vincentio.gregorius.1584-1667",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "schooten.frans.1615-1660",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "vincentio.gregorius.1584-1667",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "golius.jacobus.1596-1667",
    "type": "resolved"
  },
  {
    "source": "sarasa.alfonse-antonio.1618-1667",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "gutschoven.gerard.1615-1668",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "sarasa.alfonse-antonio.1618-1667",
    "type": "resolved"
  },
  {
    "source": "brereton.william.1631-1697",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "lipstorp.daniel.1631-1684",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "tacquet.andre.1612-1660",
    "type": "resolved"
  },
  {
    "source": "kinner-lowenthurn.gottfried-aloys.1610-",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "tacquet.andre.1612-1660",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "gutschoven.gerard.1615-1668",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "kinner-lowenthurn.gottfried-aloys.1610-",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "lipstorp.daniel.1631-1684",
    "type": "resolved"
  },
  {
    "source": "lipstorp.daniel.1631-1684",
    "target": "schooten.frans.1615-1660",
    "type": "resolved"
  },
  {
    "source": "huygens.constantijn.1596-1687",
    "target": "colvius.andreas.1594-1671",
    "type": "resolved"
  },
  {
    "source": "colvius.andreas.1594-1671",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "wallis.john.1616-1703",
    "type": "resolved"
  },
  {
    "source": "wallis.john.1616-1703",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "hevelius.johannes.1611-1687",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "colvius.andreas.1594-1671",
    "type": "resolved"
  },
  {
    "source": "huygens.philips.1633-1657",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "hevelius.johannes.1611-1687",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "aynscom.francois-xavier.1624-1660",
    "type": "resolved"
  },
  {
    "source": "hodierna.giovanni-battista.1597-1660",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "schooten.frans.1615-1660",
    "target": "fermat.pierre.1601-1665",
    "type": "resolved"
  },
  {
    "source": "paget.robert.-1684",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "sluse.rene-francois.1622-1685",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "sluse.rene-francois.1622-1685",
    "type": "resolved"
  },
  {
    "source": "bruno.henrick.1617-1664",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "bruno.henrick.1617-1664",
    "type": "resolved"
  },
  {
    "source": "heuraet.hendrik.1633-1660",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "heinsius.nicolaas.1620-1681",
    "type": "resolved"
  },
  {
    "source": "boddens.abraham.1638-1661",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "boddens.abraham.1638-1661",
    "type": "resolved"
  },
  {
    "source": "vliet.johannes.1622-1666",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "hodierna.giovanni-battista.1597-1660",
    "type": "resolved"
  },
  {
    "source": "vliet.johannes.1622-1666",
    "target": "huygens.christiaan.1629-1695huygens.lodewijk.1631-1699",
    "type": "resolved"
  },
  {
    "source": "mylon.claude.1618-1660",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "conradus.balthasar.1599-1660",
    "type": "resolved"
  },
  {
    "source": "boulliau.ismael.1605-1694",
    "target": "medici.leopoldo.1617-1675",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "medici.leopoldo.1617-1675",
    "type": "resolved"
  },
  {
    "source": "gottignies.gilles-francois.1630-1689",
    "target": "vincentio.gregorius.1584-1667",
    "type": "resolved"
  },
  {
    "source": "heinsius.nicolaas.1620-1681",
    "target": "dati.carlo-roberto.1619-1676",
    "type": "resolved"
  },
  {
    "source": "hesius.guilielmus.1601-1690",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "duyk.adriaan.1628-",
    "type": "resolved"
  },
  {
    "source": "?",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "neure.michel.1594-1677",
    "target": "chapelain.jean.1595-1674",
    "type": "resolved"
  },
  {
    "source": "heinsius.nicolaas.1620-1681",
    "target": "boulliau.ismael.1605-1694",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "carcavy.pierre.1600-1684",
    "type": "resolved"
  },
  {
    "source": "boulliau.ismael.1605-1694",
    "target": "heinsius.nicolaas.1620-1681",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "rumph.christiaan-constantijn.1628-1702",
    "type": "resolved"
  },
  {
    "source": "heinsius.nicolaas.1620-1681",
    "target": "gronovius.johannes-fredericus.1611-1671",
    "type": "resolved"
  },
  {
    "source": "heinsius.nicolaas.1620-1681",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "dati.carlo-roberto.1619-1676",
    "type": "resolved"
  },
  {
    "source": "fermat.pierre.1601-1665",
    "target": "carcavy.pierre.1600-1684",
    "type": "resolved"
  },
  {
    "source": "neure.michel.1594-1677",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "frenicle-bessy.bernard.1605-1675",
    "target": "wallis.john.1616-1703",
    "type": "resolved"
  },
  {
    "source": "schott.caspar.1608-1666",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "witt.johan.1625-1672",
    "type": "resolved"
  },
  {
    "source": "boyle.robert.1627-1691",
    "target": "oldenburg.henry.1619-1677",
    "type": "resolved"
  },
  {
    "source": "campani.matteo.1620-",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "heinsius.nicolaas.1620-1681",
    "target": "lubienietzki.stanislas.1623-1675",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "vliet.johannes.1622-1666",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "ruijsch.johannes-hugo.1631-1690",
    "type": "resolved"
  },
  {
    "source": "kinner-lowenthurn.gottfried-aloys.1610-",
    "target": "schott.caspar.1608-1666",
    "type": "resolved"
  },
  {
    "source": "kinner-lowenthurn.gottfried-aloys.1610-",
    "target": "vincentio.gregorius.1584-1667",
    "type": "resolved"
  },
  {
    "source": "sluse.rene-francois.1622-1685",
    "target": "sorbiere.samuel.1615-1670",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "campani.matteo.1620-",
    "type": "resolved"
  },
  {
    "source": "schuler.johannes.1606-1676",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "wall.hadrianus.fl.1665-1673",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "hevelius.johannes.1611-1687",
    "target": "oldenburg.henry.1619-1677",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "paget.robert.-1684",
    "type": "resolved"
  },
  {
    "source": "swam001",
    "target": "thev001",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "thevenot.melchisedec.1620-1692",
    "type": "resolved"
  },
  {
    "source": "oldenburg.henry.1619-1677",
    "target": "spinoza.baruch.1632-1677",
    "type": "resolved"
  },
  {
    "source": "lubienietzki.stanislas.1623-1675",
    "target": "auzout.adrien.1622-1691",
    "type": "resolved"
  },
  {
    "source": "lubienietzki.stanislas.1623-1675",
    "target": "heinsius.nicolaas.1620-1681",
    "type": "resolved"
  },
  {
    "source": "lubienietzki.stanislas.1623-1675",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "spinoza.baruch.1632-1677",
    "target": "oldenburg.henry.1619-1677",
    "type": "resolved"
  },
  {
    "source": "spinoza.baruch.1632-1677",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "fogelius.martinus.1634-1675",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "slad002",
    "target": "swam001",
    "type": "resolved"
  },
  {
    "source": "horn901",
    "target": "swam001",
    "type": "resolved"
  },
  {
    "source": "gregory.james.1638-1675",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "sten901",
    "target": "swam001",
    "type": "resolved"
  },
  {
    "source": "wallis.john.1616-1703",
    "target": "oldenburg.henry.1619-1677",
    "type": "resolved"
  },
  {
    "source": "gregory.james.1638-1675",
    "target": "oldenburg.henry.1619-1677",
    "type": "resolved"
  },
  {
    "source": "wren.christopher.1632-1723",
    "target": "royal-society.london",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "royal-society.london",
    "type": "resolved"
  },
  {
    "source": "nulandt.franciscus-gulielmus.fl.1668-1669",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "comiers.claude.-1693",
    "target": "academie-sciences.paris",
    "type": "resolved"
  },
  {
    "source": "wren.christopher.1632-1723",
    "target": "oldenburg.henry.1619-1677",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "oldenburg.henry.1619-1677",
    "type": "resolved"
  },
  {
    "source": "picard.jean.1620-1682",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "albert-luynes.charles-honore.1646-1712",
    "type": "resolved"
  },
  {
    "source": "sluse.rene-francois.1622-1685",
    "target": "oldenburg.henry.1619-1677",
    "type": "resolved"
  },
  {
    "source": "olde010",
    "target": "swam001",
    "type": "resolved"
  },
  {
    "source": "oldenburg.henry.1619-1677",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "swam001",
    "target": "olde010",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "fra.louis-xiv.1638-1715",
    "type": "resolved"
  },
  {
    "source": "gillet.francois-pierre.1648-1720",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "goes.willem.1613-1688",
    "target": "magliabechi.antonio.1633-1714",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "romer.ole.1644-1710",
    "type": "resolved"
  },
  {
    "source": "romer.ole.1644-1710",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "grew.nehemiah.1641-1712",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "grew.nehemiah.1641-1712",
    "type": "resolved"
  },
  {
    "source": "lamothe.fl.1679",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "lamothe.fl.1679",
    "type": "resolved"
  },
  {
    "source": "leibniz.gottfried-wilhelm.1646-1716",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "columbus.johan.1640-1684",
    "target": "rumph.christiaan-constantijn.1628-1702",
    "type": "resolved"
  },
  {
    "source": "bilberg.johann.1650-1717",
    "target": "columbus.johan.1640-1684",
    "type": "resolved"
  },
  {
    "source": "spole.andreas.1630-1699",
    "target": "columbus.johan.1640-1684",
    "type": "resolved"
  },
  {
    "source": "tschirnhaus.ehrenfried-walther.1651-1708",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "gent.pieter.1640-",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "alberghetti.sigismondo.-1702",
    "type": "resolved"
  },
  {
    "source": "alberghetti.sigismondo.-1702",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "fullenius.bernhardus.1640-1707",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "fullenius.bernhardus.1640-1707",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "puy-lepinasse.charles.-1695",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "tschirnhaus.ehrenfried-walther.1651-1708",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "gent.pieter.1640-",
    "type": "resolved"
  },
  {
    "source": "tschirnhaus.ehrenfried-walther.1651-1708",
    "target": "makreel.dirck.fl.1687",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "coets.h.fl.1687",
    "type": "resolved"
  },
  {
    "source": "vegelin-claerbergen.philip-ernst.1613-1693",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "coets.h.fl.1687",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "spener.jan-jacob.fl.1690",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "ludolff.job.1649-1711",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "meier.gerhard.1646-1703",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "meier.gerhard.1646-1703",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "acta-eruditorum",
    "type": "resolved"
  },
  {
    "source": "cuper.gisbert.1644-1716",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "cuper.gisbert.1644-1716",
    "type": "resolved"
  },
  {
    "source": "velden.maarten-etienne.1667-1724",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "huygens.hubertus.1651-1705",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "huygens.hubertus.1651-1705",
    "type": "resolved"
  },
  {
    "source": "steigerthal.johannes-georg.1666-1740",
    "target": "huygens.christiaan.1629-1695",
    "type": "resolved"
  },
  {
    "source": "huygens.christiaan.1629-1695",
    "target": "steigerthal.johannes-georg.1666-1740",
    "type": "resolved"
  }
];
var fill = d3.scale.category20();

$("#"+container_id).html("");


var nodes = {};

links.forEach(function(link) {
  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
});

var width = $("#" + container_id).width(),
    height =  $("#" + container_id).height() ;

var force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([width, height])
    .charge(-1000)
   	.distance(150)
    .on("tick", tick)
    .start();


  var body = d3.select("#"+container_id);

    var svg = body.append("svg").attr('id', 'd3allauthors').attr("viewBox", "0 0 " + width + " " + height).attr("preserveAspectRatio", "xMidYMid meet").call(d3.behavior.zoom().scaleExtent([-4, 8]).on("zoom", zoom)).on("dblclick.zoom", null).append('g').attr('id', 'viewport_all_authors');




// Per-type markers, as they don't inherit styles.
svg.append("defs").selectAll("marker")
    .data(["suit", "licensing", "resolved"])
  .enter().append("marker")
    .attr("id", function(d) { return d; })
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -1.5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
  .append("path")
    .attr("d", "M0,-5L10,0L0,5");

var path = svg.append("g").selectAll("path")
    .data(force.links())
  .enter().append("path")
    .attr("class", function(d) { 
    	return "link " + d.type; 
    })
    .style("stroke", function(d) { 
    
    	if (_.contains(authors, d.source.name) && _.contains(authors, d.target.name)){
    		return "#e60000"
    	}else{
    		return "#d4d4d4";
    	}
    	
    })

    .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });
    	
var circle = svg.append("g").selectAll("circle")
    .data(force.nodes())
    .enter().append("circle")
    .attr("r", 6)
    .style("fill",function(a){

    	if (_.contains(authors, a.name)){
    		return "#e60000"
    	}else{
    		return "#666666";
    	}
    	
    })
    .call(force.drag);

var text = svg.append("g").selectAll("text")
    .data(force.nodes())
  .enter().append("text")
    .attr("x", 8)
    .attr("y", ".31em")
    .text(function(d) { return d.name.split(".")[1]+ " "+ d.name.split(".")[0]; });

// Use elliptical arc path segments to doubly-encode directionality.
function tick() {
  path.attr("d", linkArc);
  circle.attr("transform", transform);
  text.attr("transform", transform);
}

function linkArc(d) {
  var dx = d.target.x - d.source.x,
      dy = d.target.y - d.source.y,
      dr = Math.sqrt(dx * dx + dy * dy);
  return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
}

function transform(d) {
  return "translate(" + d.x + "," + d.y + ")";
}

    function zoom() {
        svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }



}



