// import '/src/style.css';

const Storage = (storageType) => {
  const store = storageType === 'local' ? localStorage : sessionStorage;

  const save = (key, value) => store.setItem(key, JSON.stringify(value));
  const get = (key) => {
    const item = store.getItem(key);
    return item ? JSON.parse(item) : null;
  };
  const remove = (key) => store.removeItem(key);
  const clear = () => store.clear();

  return { save, get, remove, clear };
};

const cartStorage = Storage('session');
const formStorage = Storage('local');

var EventListeners = (function () {
  const submitEmail = document.getElementById('newsLetterSubmit');
  const addToCartButtons = document.querySelectorAll('.addToCartBtn');

  // ********* MODAL ********* //
  const modal = document.getElementById('cartModal');
  const clearCartBtn = document.getElementById('clearCart');
  const processOrderBtn = document.getElementById('processOrder');
  const closeModal = document.getElementById('closeModal');
  const viewCartBtn = document.getElementById('viewCart');
  // ************************* //

  const cartList = document.getElementById('cartList');

  // ********* FEEDBACK FORM ********* //
  const feedbackForm = document.getElementById('fullName');

  if (feedbackForm) {
    // console.log('feedback form exists')
    // repopulate fields if saved data exists
    const saved = formStorage.get('feedbackForm');
    if (saved) {
      document.getElementById('fullName').value = saved.name || '';
      document.getElementById('email').value = saved.email || '';
      document.getElementById('phone').value = saved.phone || '';
      document.getElementById('message').value = saved.message || '';
    }

    // listen on form submit instead of button click
    // this allows browser validation to fire first
    const aboutForm = document.querySelector('.aboutForm');
    if (aboutForm) {
      aboutForm.addEventListener('submit', function (event) {
        event.preventDefault(); // only runs AFTER browser validates fields

        const formData = {
          name: document.getElementById('fullName').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          message: document.getElementById('message').value,
        };

        formStorage.save('feedbackForm', formData);
        alert('Thank you for your message.');
      });
    }

    // clear button - remove from storage and reset fields
    const clearForm = document.getElementById('clearForm');
    if (clearForm) {
      clearForm.addEventListener('click', function () {
        formStorage.remove('feedbackForm');
        document.getElementById('fullName').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('message').value = '';
      });
    }
  }
  // ********************************* //

  // ********* RENDER CART ********* //
  function renderCart() {
    const cart = cartStorage.get('cart') || [];
    cartList.innerHTML = '';

    if (cart.length === 0) {
      cartList.innerHTML = '<li>Your cart is empty</li>';
    } else {
      cart.forEach(function (item) {
        const li = document.createElement('li');
        li.textContent = item;
        cartList.appendChild(li);
      });
    }
  }
  // ********************************* //

  const communityCTAForm = document.querySelector('.communityCTAForm');
  if (communityCTAForm) {
    // console.log('subscribe form exists')
    communityCTAForm.addEventListener('submit', function (event) {
      event.preventDefault(); // fires AFTER browser validates email field
      alert('Thank you for subscribing.');
    });
  }

  const newsletterForm = document.querySelector('.newsletterForm');
  if (newsletterForm) {
    // console.log('newsletter subscribe form exists')
    newsletterForm.addEventListener('submit', function (event) {
      event.preventDefault(); // fires AFTER browser validates email field
      alert('Thank you for subscribing.');
    });
  }

  if (addToCartButtons.length > 0) {
    addToCartButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        const itemName =
          this.closest('.cartItem').querySelector('h2').textContent;
        const cart = cartStorage.get('cart') || [];
        cart.push(itemName);
        cartStorage.save('cart', cart);
        alert('Item added to the cart.');
      });
    });
  }

  if (modal) {
    clearCartBtn.addEventListener('click', function () {
      cartStorage.clear();
      alert('Cart cleared.');
      renderCart();
    });

    processOrderBtn.addEventListener('click', function () {
      cartStorage.clear();
      alert('Thank you for your order.');
      modal.style.display = 'none';
    });

    closeModal.addEventListener('click', function () {
      modal.style.display = 'none';
    });

    if (viewCartBtn) {
      viewCartBtn.addEventListener('click', function () {
        renderCart();
        modal.style.display = 'flex';
      });
    }

    window.addEventListener('click', function (event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
})();
