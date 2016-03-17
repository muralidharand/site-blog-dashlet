<@markup id="css" >
    <#-- CSS Dependencies -->
   <@link rel="stylesheet" type="text/css" href="${url.context}/res/extras/components/dashlets/site-blog.css" group="dashlets"/>
   <@link rel="stylesheet" type="text/css" href="${url.context}/res/modules/taglibrary/taglibrary.css" group="dashlets"/>
</@>

<@markup id="js">
    <#-- JavaScript Dependencies -->    
    <@script type="text/javascript" src="${url.context}/res/modules/simple-dialog.js" group="dashlets"/>
    <@script type="text/javascript" src="${url.context}/res/modules/editors/tiny_mce.js" group="dashlets"/>  
    <@script type="text/javascript" src="${url.context}/res/modules/taglibrary/taglibrary.js" group="dashlets"/> 
    <!-- Site Blog dashlet -->
    <@script type="text/javascript" src="${url.context}/res/extras/components/dashlets/site-blog.js" group="dashlets"/>  
</@>
 
<@markup id="widgets">    
    <#assign id=args.htmlid?replace("-", "_")>
   <@inlineScript group="dashlets">
      var createBlogPostEvent_${id} = new YAHOO.util.CustomEvent("createPostEvent");
   </@>
   <@createWidgets group="dashlets"/>
   <@inlineScript group="dashlets">
      createBlogPostEvent_${id}.subscribe(siteBlogDashlet.onCreatePostClick, siteBlogDashlet, true);
   </@>  
</@>

<@markup id="html">
   <@uniqueIdDiv>
        <div class="dashlet site-blog-posts">
            <div class="title">${msg("header.siteBlog")}</div>
                <div class="body scrollableList" id="${args.htmlid}-body" <#if args.height??>style="height: ${args.height}px;"</#if>>
            </div>
        </div>
    </@>
 </@>