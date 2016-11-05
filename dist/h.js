'use strict';

var tags = '\nhtml head title base link meta style\nbody article section nav aside h1 h2 h3 h4 h5 h6 header footer address\np hr pre blockquote ol ul li dl dt dd figure figcaption main div\na em strong small s cite q dfn abbr ruby rb rt rtc rp data time code var samp kbd sub sup i b u mark bdi bdo span br wbr\nins del\npicture source img iframe embed object param video audio source track map area\ntable caption colgroup col tbody thead tfoot tr td th\nform label input button select datalist optgroup option textarea keygen output progress meter fieldset legend\ndetails summary menu menuitem\nscript noscript template canvas\n'.trim().split(/\s+/g);

function appendChildren(el, children) {
	for (var i = 0, l = children.length; i < l; i++) {
		var child = children[i];

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
	var el = document.createElement(tagName);

	for (var i = 1, l = arguments.length; i < l; i++) {
		var arg = arguments[i];

		if (arg != null) {
			if (arg instanceof Node) {
				el.appendChild(arg);
			} else if (typeof arg == 'object') {
				if (Array.isArray(arg)) {
					appendChildren(el, arg);
				} else {
					for (var attrName in arg) {
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

tags.forEach(function (name) {
	h[name] = function () {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return h.apply(undefined, [name].concat(args));
	};
});

module.exports = h;