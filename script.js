// Original JavaScript

// Add a hover effect to table of contents items
document.addEventListener('DOMContentLoaded', function () {
  const tocItems = document.querySelectorAll('.toc a');
  tocItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.backgroundColor = '#f0f0f0';
    });
    item.addEventListener('mouseleave', () => {
      item.style.backgroundColor = '#fff';
    });
  });
});

// Additional JavaScript

// Add event listener to toggle dropdown menu
document.addEventListener('DOMContentLoaded', function () {
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    const title = dropdown.querySelector('.dropdown-title');
    const submenu = dropdown.querySelector('.submenu');
    title.addEventListener('click', function () {
      submenu.classList.toggle('active');
    });
  });
});

// New code block
document.addEventListener('DOMContentLoaded', function() {
  var submenuBtn = document.querySelector('.submenu-btn-left');
  var submenuContent = document.querySelector('.submenu-content-left');

  submenuBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    submenuContent.style.display = submenuContent.style.display === 'block' ? 'none' : 'block';
  });

  // 其他代码...
});


