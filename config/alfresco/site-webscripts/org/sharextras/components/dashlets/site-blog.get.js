function main()
{
   // Call the repository to see if the user is site manager or not
   var userIsSiteContributor = false,
       json = remote.call("/api/sites/" + page.url.templateArgs.site + "/memberships/" + encodeURIComponent(user.name));
   
   if (json.status == 200)
   {
      var obj = eval('(' + json + ')');
      if (obj)
      {
         userIsSiteContributor = (obj.role == "SiteContributor" || obj.role == "SiteCollaborator" || obj.role == "SiteManager");
      }
   }
   model.userIsSiteContributor = userIsSiteContributor;
   
   /* For Alfresco 5.0 version fix */
   var siteBlogDashlet = {
       id : "siteBlogDashlet", 
      name : "Alfresco.dashlet.SiteBlog",
      assignTo : "siteBlogDashlet",
      options : {        
        siteId : (page.url.templateArgs.site != null) ? page.url.templateArgs.site : ""
      }
   };
   
   var dashletResizer = {
      id : "DashletResizer", 
      name : "Alfresco.widget.DashletResizer",
      initArgs : ["\"" + args.htmlid + "\"","\"" + instance.object.id + "\""],
      useMessages: false
   };

   var actions = [];
   if (model.userIsSiteContributor)
   {
      actions.push(
      {
         cssClass: "createPost",
         eventOnClick: { _alfValue : "createBlogPostEvent_" + args.htmlid.replace(/-/g, "_"), _alfType: "REFERENCE"},
         tooltip: msg.get("dashlet.createBlogPost.tooltip")
      });
   } 
   actions.push(
      {
         cssClass: "help",
         bubbleOnClick:
         {
            message: msg.get("dashlet.help")
         },
         tooltip: msg.get("dashlet.help.tooltip")
      });

   var dashletTitleBarActions = {
      id : "DashletTitleBarActions", 
      name : "Alfresco.widget.DashletTitleBarActions",
      useMessages : false,
      options : {
         actions: actions
      }
   };
   model.widgets = [siteBlogDashlet,dashletResizer, dashletTitleBarActions];
}

main();