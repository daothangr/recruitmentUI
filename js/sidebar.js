document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.sidebar-footer a');

    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sidebar.classList.toggle('sidebar-shorted');
    });
});
