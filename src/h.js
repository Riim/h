let tags = `
html head title base link meta style
body article section nav aside h1 h2 h3 h4 h5 h6 header footer address
p hr pre blockquote ol ul li dl dt dd figure figcaption main div
a em strong small s cite q dfn abbr ruby rb rt rtc rp data time code var samp kbd sub sup i b u mark bdi bdo span br wbr
ins del
picture source img iframe embed object param video audio source track map area
table caption colgroup col tbody thead tfoot tr td th
form label input button select datalist optgroup option textarea keygen output progress meter fieldset legend
details summary menu menuitem
script noscript template canvas
`.trim().split(/\s+/g);

function appendChildren(el, children) {
	for (let i = 0, l = children.length; i < l; i++) {
		let child = children[i];

		if (child != null) {
			if (child instanceof Node) {
				el.appendChild(child);
			} else if (typeof child == 'object') {
				appendChildren(el, child);
			} else {
				el.appendChild(document.createTextNode(child));
			}
		}
	}
}

function h(tagName) {
	let el = document.createElement(tagName);

	for (let i = 1, l = arguments.length; i < l; i++) {
		let arg = arguments[i];

		if (arg != null) {
			if (arg instanceof Node) {
				el.appendChild(arg);
			} else if (typeof arg == 'object') {
				if (Array.isArray(arg)) {
					appendChildren(el, arg);
				} else {
					for (let attrName in arg) {
						el.setAttribute(attrName, arg[attrName]);
					}
				}
			} else {
				el.appendChild(document.createTextNode(arg));
			}
		}
	}

	return el;
}

tags.forEach(name => {
	h[name] = (...args) => {
		return h(name, ...args);
	};
});

module.exports = h;
