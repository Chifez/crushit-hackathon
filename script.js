document.addEventListener('DOMContentLoaded', function () {
  //containers
  const list = document.getElementById('setup-list');
  const selectPlan = document.querySelector('.info_container');
  const accordionItems = document.querySelectorAll('.accordion li');
  const progressText = document.querySelector('.setup_progress p');
  const progressBar = document.querySelector('#setup-progress');
  const notification = document.querySelector('.user_notification');
  const menu = document.querySelector('.user_menu');
  const menuContainer = document.querySelector('.user_menu_container');
  const notificationContainer = document.querySelector(
    '.user_notification_container'
  );
  const body = document.querySelector('#container');

  //Buttons
  const toggleListButton = document.getElementById('toggle-setup-list');
  const closeSelectBannerButton = document.querySelector('.info_cancelbtn');
  const notificationButton = document.querySelector('.bell');
  const userButton = document.querySelector('.user');

  // Initial state
  let listVisible = false;
  let activeIndex = 0;
  let completedItems = 0;

  // Toggle setup list function
  function toggleSetupList() {
    const buttons = document.querySelectorAll('#toggle-setup-list .setup_btn');
    if (listVisible) {
      list.classList.add('hidden');
    } else {
      list.classList.remove('hidden');
    }
    listVisible = !listVisible;

    buttons[activeIndex].classList.remove('active');
    activeIndex = (activeIndex + 1) % buttons.length;
    buttons[activeIndex].classList.add('active');
  }

  function toggleNotification() {
    //when it is clicked and opened focus on the button
    // when it is closed remove focus from the button
    // menu.classList.add('hidden');
    // notification.classList.toggle('hidden');

    menuContainer.classList.add('hidden');
    notificationContainer.classList.toggle('hidden');
  }

  function toggleUserMenu() {
    //when it is clicked focus on the button
    // when it is open remove focus from the button and focus on the first item on the list
    // notification.classList.add('hidden');
    // menu.classList.toggle('hidden');

    notificationContainer.classList.add('hidden');
    menuContainer.classList.toggle('hidden');
  }

  function closeMenu() {
    menuContainer.classList.add('hidden');
    notificationContainer.classList.add('hidden');
  }

  //close banner function
  function closeSelectbanner() {
    document.querySelector('.main_container').removeChild(selectPlan);
  }

  // toggle accordion items
  function toggleAccordionItem(item) {
    accordionItems.forEach((otherItem) => {
      otherItem.classList.remove('active');
    });
    item.classList.add('active');
    item.focus();
  }

  //update progress
  function updateProgress(box) {
    let isChecked = box.getAttribute('aria-checked') === 'true';

    const activeSpan = box.querySelector('[aria-label="click to check"]');
    const loadingSpan = box.querySelector('[aria-label="loading"]');
    const checkedSpan = box.querySelector('[aria-label="checked"]');

    if (!isChecked) {
      completedItems++;

      activeSpan.classList.remove('active');
      activeSpan.classList.add('hidden');

      // 2) Show the loading SVG for 2 seconds
      loadingSpan.classList.remove('hidden');
      setTimeout(function () {
        loadingSpan.classList.add('hidden');
        checkedSpan.classList.add('active');
        checkedSpan.classList.remove('hidden');
      }, 1500);
      // 3) Show the checked SVG
    } else {
      completedItems--;
      checkedSpan.classList.remove('active');
      checkedSpan.classList.add('hidden');

      loadingSpan.classList.remove('hidden');
      setTimeout(function () {
        loadingSpan.classList.add('hidden');
        activeSpan.classList.remove('hidden');
        activeSpan.classList.add('active');
      }, 1500);
    }

    setTimeout(function () {
      const totalItems = accordionItems.length;
      const progressValue = (completedItems / totalItems) * 100;
      progressText.textContent = `${completedItems} / ${totalItems} completed`;
      progressBar.value = progressValue;
      box.setAttribute('aria-checked', !isChecked);
    }, 1500);
  }

  //eventlisteners functions
  toggleListButton.addEventListener('click', toggleSetupList);
  closeSelectBannerButton.addEventListener('click', closeSelectbanner);
  notificationButton.addEventListener('click', toggleNotification);
  userButton.addEventListener('click', toggleUserMenu);

  body.addEventListener('click', closeMenu);

  accordionItems.forEach((item) => {
    const checkbox = item.querySelector('button[role="checkbox"]');
    checkbox.addEventListener('click', () => updateProgress(checkbox));
    item.addEventListener('click', () => toggleAccordionItem(item));
  });
});
