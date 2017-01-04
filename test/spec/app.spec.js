describe('App tag', function () {
	before(function () {
		var html = document.createElement('app')
		document.body.appendChild(html)
		tag = riot.mount('app')[0]
	})

	it('mounts an app tag', function () {
		expect(tag).to.exist
		expect(tag.isMounted).to.be.true
	})
})