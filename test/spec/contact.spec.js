describe('Contact tag', function () {
	before(function () {
		var html = document.createElement('contact')
		document.body.appendChild(html)
		tag = riot.mount('contact')[0]
	})

	it('mounts a contact tag', function () {
		expect(tag).to.exist
		expect(tag.isMounted).to.be.true
	})
})