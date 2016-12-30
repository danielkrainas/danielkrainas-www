<screenpanel>
   <yield />

	<script>
		const HEIGHT = window.innerHeight;

        opts.color = opts.color || 'black';

		this.on('mount', () => {
            var values = opts.full ? opts.full.split(',') : ['min'];
            for (var i = 0; i < values.length; i++) {
                var name = values[i];
                if (name === 'actual' || name === '') {
                    name = 'height';
                } else {
                    name = name + '-height';
                }

                this.root.firstChild.style[name] = '' + HEIGHT + 'px';
            }  
		})
	</script>
</screenpanel>