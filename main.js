function renderTemplate(templateId, container, finalArgument) {
    var templateString = $('#' + templateId).text();
    var templateFunction = _.template(templateString);
    var renderedTemplate = templateFunction(finalArgument);
    $(container).append(renderedTemplate);
};

$.getJSON("https://api.github.com/users/plove13x").done(function(item) {
    var userInfo = {
            "avatar_url": item.avatar_url,
            "name": item.name,
            "login": item.login,
            "company": item.company,                
            "location": item.location,
            "email": item.email,
            "blog": item.blog,   
            "created_at": item.created_at && moment(item.created_at).fromNow(),
            "followers": item.followers,
            "following": item.following
    };
    renderTemplate('headerTemplateScript', '.nB', userInfo);
    renderTemplate('sidebarTemplateScript', '.sidebar', userInfo); 

        $.getJSON("https://api.github.com/users/plove13x/starred").done(function(data) {
            userInfo.starred = data.length;
            renderTemplate('followTemplateScript', '.belowProfile', userInfo);
        

            $.getJSON("https://api.github.com/users/jgoley/orgs").done(function(data) {
                var orgsArray = data.map(function(item) {
                    return {
                        "avatar_url": item.avatar_url
                    };    
                });
                _.each(orgsArray, function(org) {
                    renderTemplate('orgsTemplateScript', '.orgz', org);
                }); 
            });
        });
});

$.getJSON("https://api.github.com/users/plove13x/repos").done(function(data) {
    var ploveRepos = data.map(function(item) {
        return {
            "language": item.language,
            "stargazers_count": item.stargazers_count,
            "name": item.name,
            "html_url": item.html_url,
            "fork": item.fork,                              /*defaults/extends?*/
            "description": item.description,            /*HOW WOULD I EXTRACT THIS AND IS THIS EVEN THE RIGHT PROPERTY?*/
            
            "updated_at": moment(item.updated_at).fromNow()    
        };
    });
    _.each(ploveRepos, function(repo) {
        renderTemplate('reposTemplateScript', '.repos', repo);            
    });
});



