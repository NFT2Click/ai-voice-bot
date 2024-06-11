document.addEventListener("DOMContentLoaded", function() {
    const materialsList = document.getElementById('materialsList');

    function addMaterial(title, description, link) {
        const material = document.createElement('div');
        material.classList.add('material');
        const materialTitle = document.createElement('h3');
        materialTitle.textContent = title;
        const materialDescription = document.createElement('p');
        materialDescription.textContent = description;
        const materialLink = document.createElement('a');
        materialLink.href = link;
        materialLink.textContent = 'View Material';
        materialLink.target = '_blank';

        material.appendChild(materialTitle);
        material.appendChild(materialDescription);
        material.appendChild(materialLink);
        materialsList.appendChild(material);
    }

    fetch('/api/study-materials')
        .then(response => response.json())
        .then(data => {
            data.forEach(material => {
                addMaterial(material.title, material.description, material.link);
            });
        })
        .catch(error => console.error('Error fetching study materials:', error));
});
