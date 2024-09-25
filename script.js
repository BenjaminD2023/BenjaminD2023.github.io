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

// 目录项悬停效果
const tocItems = document.querySelectorAll('.toc-items a, .dropdown-title');
tocItems.forEach(item => {
  item.addEventListener('mouseenter', () => item.style.backgroundColor = '#3498db');
  item.addEventListener('mouseleave', () => item.style.backgroundColor = '');
});

// 下拉菜单切换
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
  const title = dropdown.querySelector('.dropdown-title');
  const submenu = dropdown.querySelector('.submenu');
  title.addEventListener('click', () => {
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
  });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// 左侧子菜单切换
const submenuBtn = document.querySelector('.submenu-btn-left');
const submenuContent = document.querySelector('.submenu-content-left');
if (submenuBtn && submenuContent) {
  submenuBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    submenuContent.style.display = submenuContent.style.display === 'block' ? 'none' : 'block';
  });
}

// 图片放大效果
const datasheetImages = document.querySelectorAll('.datasheet-img');
datasheetImages.forEach(img => {
  img.addEventListener('click', () => {
    img.classList.toggle('enlarged');
  });
});

// 返回顶部按钮
const backToTopButton = document.createElement('button');
backToTopButton.textContent = '返回顶部';
backToTopButton.classList.add('back-to-top');
document.body.appendChild(backToTopButton);

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});


