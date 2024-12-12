document.addEventListener('DOMContentLoaded', function() {
    const captureButton = document.getElementById('capture-photo'); // Capture button
    if (captureButton) {
        captureButton.addEventListener('click', async () => { // Capture button event listener
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) { // If the browser supports media devices and getUserMedia
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true }); // Get the user media
                    video.srcObject = stream; // Set the video source to the stream
                    video.classList.remove('hidden'); // Remove the hidden class from the video
                    captureButton.textContent = 'Tomar Foto'; // Set the text of the capture button to 'Tomar Foto'
                    
                    captureButton.onclick = () => {
                        context.drawImage(video, 0, 0, 320, 240); // Draw the image from the video to the canvas
                        video.classList.add('hidden'); // Add the hidden class to the video
                        canvas.classList.remove('hidden'); // Remove the hidden class from the canvas
                        captureButton.textContent = 'Capturar desde Webcam'; // Set the text of the capture button to 'Capturar desde Webcam'
                        stream.getTracks().forEach(track => track.stop()); // Stop the stream
                        saveImage(); // Save the image
                    };
                } catch (error) {
                    console.error('Error accessing webcam: ', error); // If there is an error accessing the webcam, log the error
                }
            }
            const video = document.getElementById('video'); // Get the video element
            const canvas = document.getElementById('canvas'); // Get the canvas element
            const captureButton = document.getElementById('capture-photo'); // Get the capture button element
            if (canvas) {
                const context = canvas.getContext('2d'); // Get the context of the canvas
            } else {
                console.error('El elemento canvas no se encontró en el DOM.');
            }
                
        });
    }

   // Define la función showMachineQRCode
window.showMachineQRCode = function(machineId) {
    console.log("Generando QR para la máquina ID:", machineId);
    const url = `/generate_machine_qr/${machineId}`;
    const windowFeatures = "width=400,height=400,scrollbars=no,resizable=no";
    window.open(url, "_blank", windowFeatures);
};

function deleteMachine(machineId) {
  if (confirm('¿Estás seguro de que quieres eliminar esta máquina?')) { // If the user confirms the deletion
      fetch(`/deletemachine/${machineId}`, { // Delete the machine
          method: 'POST'
      })
      .then(response => response.json()) // Get the response from the server
      .then(data => {
          if (data.success) { // If the deletion is successful
              // Remove the machine from the DOM
              document.getElementById(`machine-${machineId}`).remove();
          } else {
              alert('Error al eliminar la máquina'); // If there is an error, show an alert
          }
      })
      .catch(error => console.error('Error:', error)); // If there is an error, log the error
  }
}

document.addEventListener('DOMContentLoaded', function() { // When the DOM content is loaded
  document.getElementById('edit-machine-form').addEventListener('submit', function(event) { // When the edit machine form is submitted
      event.preventDefault(); // Prevent the default form submission

      const formData = new FormData(this); // Get the form data

      fetch('/editmachine', { // Edit the machine
          method: 'POST',
          body: formData
      });
  });

  const dropdownButtons = document.querySelectorAll('[data-dropdown-toggle]'); // Get the dropdown buttons
  dropdownButtons.forEach(button => { // For each dropdown button
      button.addEventListener('click', function() { // When the dropdown button is clicked
          const dropdownMenu = this.nextElementSibling; // Get the dropdown menu
          dropdownMenu.classList.toggle('hidden'); // Toggle the hidden class on the dropdown menu
      });
  });

  // Close the menu when clicking outside of it
  document.addEventListener('click', function(event) { // When the document is clicked
      dropdownButtons.forEach(button => { // For each dropdown button
          const dropdownMenu = button.nextElementSibling;
          if (!button.contains(event.target) && !dropdownMenu.contains(event.target)) { // If the button is not clicked and the dropdown menu is not clicked
              dropdownMenu.classList.add('hidden'); // Add the hidden class to the dropdown menu
          }
      });
  });
});

$(document).ready(function() { // When the document is ready
  function toggleButtonText() { // Toggle the button text
      if ($(window).width() < 640) { // If the resolution is less than 640px, hide the text
          $('.add-machine-button .text, .add-csv-button .text').hide(); // Hide the text of both buttons    
      } else {
          $('.add-machine-button .text').show(); // Show the text of the add machine button
          $('.add-csv-button .text').show(); // Show the text of the add machine CSV button
          
      }
  }

  // Call the function when the page loads
  toggleButtonText();

  // Call the function when the window is resized
  $(window).resize(function() {
      toggleButtonText();
  });
});
$(document).ready(function () {
    var dropZone = $('#drop-zone');

    // Cuando se arrastra un archivo sobre la zona de drop se añade la clase dragover
    dropZone.on('dragover', function (e) {
        e.preventDefault();
        $(this).addClass('dragover');
    });

    // Cuando se sale de la zona de drop se elimina la clase dragover
    dropZone.on('dragleave', function (e) {
        e.preventDefault();
        $(this).removeClass('dragover');
    });

    // Cuando se suelta el archivo en la zona de drop se ejecuta la función handleFiles
    dropZone.on('drop', function (e) {
        e.preventDefault();
        $(this).removeClass('dragover');

        var files = e.originalEvent.dataTransfer.files;
        handleFiles(files);
    });

    // Cambia el selector para incluir dropzone-file dentro de drop-zone
    $(document).on('change', '#dropzone-file', function () {
        var files = $(this)[0].files;
        handleFiles(files);
    });

    // Función para manejar los archivos
    function handleFiles(files) {
        for (var i = 0; i < files.length; i++) {
            uploadFile(files[i]);
        }
    }

    // Función para subir el archivo al servidor
    function uploadFile(file) {
        var formData = new FormData();
        formData.append('file', file);
        var usuarioID = $('#idUsuario').text();
        console.log(usuarioID);
        formData.append('usuarioID', usuarioID);

        $.ajax({
            url: '/fotoalumno1',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                console.log(response);
                alert('Foto subida correctamente');
            },
            error: function (error) {
                console.error('Error fotoalumno file:', error);
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const disponibles = document.getElementById('tecnicos-disponibles');
    const asignados = document.getElementById('tecnicos-asignados');
    const saveButton = document.getElementById('save-technicians');
    const machineId = document.getElementById('machine-id')?.value;

    if (!disponibles || !asignados || !saveButton || !machineId) {
        console.error('Faltan elementos necesarios');
        return;
    }

    // Función para mostrar notificaciones
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `fixed bottom-4 right-4 p-4 rounded-lg ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white z-50`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Función para guardar los cambios
    async function saveChanges() {
        const assignedTechnicians = Array.from(asignados.children);
        if (assignedTechnicians.length > 1) {
            showNotification('Solo se puede asignar un técnico por máquina', 'error');
            return false;
        }

        const technicianId = assignedTechnicians.length ? assignedTechnicians[0].dataset.id : null;
        console.log('Machine ID:', machineId);
        console.log('Technician ID:', technicianId);

        try {
            const response = await fetch('/assign-technician', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content
                },
                body: JSON.stringify({
                    machine_id: machineId,
                    technician_id: technicianId
                })
            });

            const data = await response.json();
            console.log('Response data:', data);

            if (!data.success) {
                throw new Error(data.message || 'Error al guardar los cambios');
            }

            showNotification('Cambios guardados correctamente');
            return true;

        } catch (error) {
            console.error('Error:', error);
            showNotification(error.message, 'error');
            return false;
        }
    }

    // Inicializar Sortable
    if (typeof Sortable !== 'undefined') {
        Sortable.create(disponibles, {
            group: 'tecnicos',
            animation: 150
        });

        Sortable.create(asignados, {
            group: 'tecnicos',
            animation: 150,
            onAdd: (evt) => {
                // Si ya hay un técnico asignado, mover el nuevo de vuelta
                if (asignados.children.length > 1) {
                    disponibles.appendChild(evt.item);
                    showNotification('Solo se puede asignar un técnico por máquina', 'error');
                }
            }
        });
    }

    // Event listener para el botón de guardar
    saveButton.addEventListener('click', async () => {
        await saveChanges();
    });
});

});
