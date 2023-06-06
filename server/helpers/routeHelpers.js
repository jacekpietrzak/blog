function isActiveRoute(route, currentRoute) {
  return route === currentRoute ? 'active' : null;
}

module.exports = { isActiveRoute };
