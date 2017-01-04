describe('Social tag', function () {
	before(function () {
		var html = document.createElement('social')
		document.body.appendChild(html)
		tag = riot.mount('social')[0]
	})

	it('mounts a social tag', function () {
		expect(tag).to.exist
		expect(tag.isMounted).to.be.true
	})
})