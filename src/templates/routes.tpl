<% routes.forEach(function(route) { %>
    <% if (route.lazyLoading) { %>
let _<%- route.hash %> = () => import(<% if (route.chunkname) { %>/* webpackChunkName: "<%- route.chunkname %>" */ <% } %>'@/<%- route.component %>');
    <% } else { %>
import _<%- route.hash %> from '@/<%- route.component %>';
    <% } %>
<% }); %>

let routes = [
<% routes.forEach(function(route) { %>
    {
        path: '<%- route.path %>',
        name: '<%- route.name %>',
        component: _<%- route.hash %>
    },
<% }); %>
];

export {routes};