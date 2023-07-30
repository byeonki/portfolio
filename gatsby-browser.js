exports.shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}) => {
	window.scrollTo(0, 0)
	setTimeout(() => {
		if(window.scrollY > 0){
			window.scrollTo(0, 0)
		}
	}, 100)
  return true
}