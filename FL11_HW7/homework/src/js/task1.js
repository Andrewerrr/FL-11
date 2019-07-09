const EMAIL_MIN_LENGTH = 6;
const PW_MIN_LENGTH = 6;
let password = null;
let setNewPassword = false;
let oldPassword = true;
const email = prompt('Enter e-mail');
if (email === 'user@gmail.com' || email === 'admin@gmail.com') {
    const password = prompt('Enter password');
    if (password) {
        if (email === 'user@gmail.com' && password === 'UserPass'
            || email === 'admin@gmail.com' && password === 'AdminPass') {
            const setNewPassword = confirm('Do you want to change your password?');
            if (setNewPassword) {
                const oldPassword = prompt('Enter old password');
                if (oldPassword) {
                    if (oldPassword === password) {
                        const newPassword = prompt('Enter new password');
                        if (!newPassword) {
                            alert('Canceled.');
                        } else if (newPassword.length < PW_MIN_LENGTH) {
                            alert('It’s too short password. Sorry.');
                        } else {
                            const newPasswordRepeat = prompt('Enter new password again');
                            if (!newPasswordRepeat) {
                                alert('Canceled.');
                            }
                            if (newPasswordRepeat === newPassword) {
                                alert('You have successfully changed your password.');
                            } else {
                                alert('You wrote the wrong password');
                            }
                        }
                    } else {
                        alert('You wrote the wrong password');
                    }
                } else {
                    alert('Canceled.');
                }
            } else {
                alert('You have failed the change.');
            }
        } else {
            alert('You wrote the wrong password.');
        }
    } else {
        alert('Canceled.');
    }
} else if (email && email.length >= EMAIL_MIN_LENGTH) {
    alert('I don’t know you');
}

if (!email) {
    alert('Canceled.');
}

if (email && email.length < EMAIL_MIN_LENGTH) {
    alert('I don\'t know any emails having name length less than 6 symbols');
}
