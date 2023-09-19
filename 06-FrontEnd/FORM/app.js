document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('sisaKarakter').innerText = document.getElementById('inputNama').maxLength;
	
	document.getElementById('inputNama').addEventListener('input', function () {
		const jumlahKarakterDiketik = document.getElementById('inputNama').value.length;
		const jumlahKarakterMaksimal = document.getElementById('inputNama').maxLength;
		
		console.log('jumlahKarakterDiketik: ', jumlahKarakterDiketik);
		console.log('jumlahKarakterMaksimal: ', jumlahKarakterMaksimal);
		const sisaKarakterUpdate = jumlahKarakterMaksimal - jumlahKarakterDiketik;
		document.getElementById('sisaKarakter').innerText = sisaKarakterUpdate.toString();
		
		if (sisaKarakterUpdate === 0) {
			document.getElementById('sisaKarakter').innerText = 'Batas maksimal tercapai!';
		} else if (sisaKarakterUpdate <= 5) {
			document.getElementById('notifikasiSisaKarakter').style.color = 'red';
		} else {
			document.getElementById('notifikasiSisaKarakter').style.color = 'black';
		}
	});
	
	document.getElementById('inputNama').addEventListener('focus', () => {
		console.log('inputNama: focus')
		document.getElementById('notifikasiSisaKarakter').style.visibility = 'visible'
	})
	
	document.getElementById('inputNama').addEventListener('blur', () => {
		console.log('inputNama: blur')
		document.getElementById('notifikasiSisaKarakter').style.visibility = 'hidden'
	})
	
	document.getElementById('inputCaptcha').addEventListener('change', () => {
		console.log('inputNCaptcha: Change')
		const captcha = document.getElementById('inputCaptcha').value
		const submitButtonStatus = document.getElementById('submitButton')
		
		if (captcha === 'PRNU') {
			submitButtonStatus.removeAttribute('disabled')
		} else {
			submitButtonStatus.setAttribute('disabled', '')
		}
	})
	
	document.getElementById('formDataDiri').addEventListener('submit', () => {
		console.log('inputCaptcha: submit')
		
		const captcha = document.getElementById('inputCaptcha').value
		
		if (captcha === 'PRNU') {
			alert('Selamat captcha anda lolos!')
		} else {
			alert('Captcha anda salah, silahkan coba kembali')
			document.getElementById('submitButton').setAttribute('disabled', '')
		}
		event.preventDefault()
	})
	
	document.getElementById('inputCopy').addEventListener('copy', () => {
		alert('Anda telah meng-copy sesuatu...')
	})
	
	document.getElementById('inputPaste').addEventListener('paste', () => {
		alert('Anda telah mem-paste sesuatu...')
	})
});