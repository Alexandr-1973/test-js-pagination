const feedbackForm = document.querySelector('.feedback-form');

feedbackForm.addEventListener('input', onFormInput);
feedbackForm.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  const email = feedbackForm.elements.email.value.trim();
  const message = feedbackForm.elements.message.value.trim();
  const formData = {
    email,
    message,
  };
  saveToLS('feedback-form-state', formData);
}

function saveToLS(key, info) {
  const infoToJson = JSON.stringify(info);
  localStorage.setItem(key, infoToJson);
}

function loadFromLs(key) {
  const infoFromJson = localStorage.getItem(key);
  try {
    return JSON.parse(infoFromJson);
  } catch {
    return infoFromJson;
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  const email = feedbackForm.elements.email.value.trim();
  const message = feedbackForm.elements.message.value.trim();
  if (email !== '' && message !== '') {
    const formData = {
      email,
      message,
    };
    console.log(formData);
    localStorage.removeItem('feedback-form-state');
    feedbackForm.reset();
  } else {
    return;
  }
}

function initPage() {
  const formData = loadFromLs('feedback-form-state') || {};
  feedbackForm.elements.email.value = formData.email || '';
  feedbackForm.elements.message.value = formData.message || '';
}

initPage();
