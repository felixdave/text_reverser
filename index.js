window.addEventListener('DOMContentLoaded', function () {
	const btn = document.querySelector('button');
	const inputArea = document.querySelector('#inputArea');
	const reversedArea = document.querySelector('#reversedArea');
	const notification = document.querySelector('#notification');

	// Reverse string func
	const reverseString = (str) => {
		return str.split('').reverse().join('');
	};

	// Notification
	const notifyUser = (charCount) => {
		// Img source: https://icons.getbootstrap.com/
		const warningImg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>`;
		notification.classList.remove('subtle');
		// Warnings based on count
		if (charCount == 300) {
			notification.innerHTML = `${warningImg} Character limit exceeded `;
		} else {
			notification.innerHTML = `${warningImg} Must be more than 1 character`;
		}
	};

	// Update text count
	const updateTextCount = (charValue) => {
		const counter = document.querySelector('#counter');
		const moveDelay = 2000;
		let charCount;

		charValue == null ? (charCount = 0) : (charCount = charValue.length);
		// if count is 1 or 300 then animate alert
		if (charCount == 1 || charCount == 300) {
			notification.classList.remove('displayNone');
			setTimeout(() => {
				// Move notification away from text area
				notification.classList.add('subtle');
			}, moveDelay);
			// Highlight counter
			counter.classList.remove('dim');
			counter.classList.add('bright');
			// Conditional note
			notifyUser(charCount);
		} // if count is not 1 or 300:
		else {
			// Hide & reset notification
			notification.classList.add('displayNone');
			notification.classList.remove('subtle');
			// Remove counter highlight
			counter.classList.remove('bright');
			counter.classList.add('dim');
			console.log(charCount);
		}
		counter.innerHTML = `${charCount}/300`;
	};

	// Clear all
	const clearAll = () => {
		inputArea.value = '';
		reversedArea.value = '';
		updateTextCount(null);
		inputArea.focus();
	};

	// Display reversed text
	const displayReversedText = () => {
		const charValue = inputArea.value;
		const charCount = charValue.length;

		// Only if char count is 2 - 300, display reversed text
		if (charCount >= 2 && charCount < 300) {
			reversedArea.value = reverseString(charValue);
		}
		// If char count is 0, clear & reset
		else if (charCount == 0) {
			clearAll();
		}
		//Keep char count up to date
		updateTextCount(charValue);
	};

	// Pre-reset fadeout
	const fadeOutIn = (el, delay) => {
		el.classList.add('fade');
		setTimeout(() => {
			el.classList.remove('fade');
		}, delay);
	};

	// Clear all & fade animate
	btn.addEventListener('click', function (e) {
		const textArea = document.querySelectorAll('textarea');
		const warning = document.querySelector('.warning');
		const delay = 700;

		// Stop page from reloading
		e.preventDefault();

		// Fadeout warning & both text areas
		fadeOutIn(warning, delay);
		textArea.forEach((el) => {
			fadeOutIn(el, delay);
		});

		// Delay the clear all
		setTimeout(() => {
			clearAll();
		}, delay);
	});

	// Move alert away from text on click
	const subtleNotification = () => {
		notification.classList.toggle('subtle');
	};

	// On keyup and paste event run reverse character
	inputArea.addEventListener('keyup', displayReversedText);
	inputArea.addEventListener('paste', displayReversedText);

	// On click move notification out of the way
	notification.addEventListener('click', subtleNotification);

	// Keyboard focus on input area
	inputArea.focus();
});
