this["Handlebars"] = this["Handlebars"] || {};
this["Handlebars"]["templates"] = this["Handlebars"]["templates"] || {};

this["Handlebars"]["templates"]["banner"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function";

  return "<div class=\"alert "
    + container.escapeExpression(((helper = (helper = helpers.alertType || (depth0 != null ? depth0.alertType : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"alertType","hash":{},"data":data}) : helper)))
    + "\">\n    <div class=\"limit-width\">\n        <button aria-label=\"Close\" class=\"close-banner close\" type=\"button\">\n            <span aria-hidden=\"true\">×</span>\n        </button>\n        "
    + ((stack1 = ((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"message","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n    </div>\n</div>\n";
},"useData":true});