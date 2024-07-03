document.addEventListener('DOMContentLoaded', function() {
  const formulario = document.querySelector('.formulario');
  const productoContainer = document.querySelector('.producto-container');

  formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombreProducto = document.getElementById('nombre-producto').value;
    const precioProducto = document.getElementById('precio-producto').value;
    const imagenProducto = document.getElementById('imagen-producto').value;

    const nuevoProducto = {
      nombre: nombreProducto,
      precio: precioProducto,
      imagen: imagenProducto
    };

    fetch('https://alurageek-xi-three.vercel.app/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoProducto)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al agregar el producto');
      }
      return response.json();
    })
    .then(data => {
      agregarProductoAlDOM(data);
      formulario.reset();
    })
    .catch(error => console.error('Error:', error));
  });

  function agregarProductoAlDOM(producto) {
    const nuevoProducto = document.createElement('div');
    nuevoProducto.classList.add('producto-ejemplo');
    nuevoProducto.dataset.id = producto.id;

    const imagen = document.createElement('img');
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;

    const nombre = document.createElement('h3');
    nombre.textContent = producto.nombre;

    const precio = document.createElement('p');
    precio.textContent = `$${producto.precio}`;

    const botonEliminar = document.createElement('button');
    botonEliminar.classList.add('eliminar-icono');
    botonEliminar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#fff" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>';
    botonEliminar.addEventListener('click', function(event) {
      event.preventDefault(); // Evitar el comportamiento predeterminado del botón

      const productoAEliminar = botonEliminar.closest('.producto-ejemplo');
      mostrarConfirmacion(productoAEliminar, () => {
        fetch(`https://alurageek-xi-three.vercel.app/api/products/${producto.id}`, {
          method: 'DELETE'
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al eliminar el producto');
          }
          return response.json(); // Devuelve el resultado para comprobar el estado de respuesta
        })
        .then(() => {
          productoContainer.removeChild(productoAEliminar); // Elimina el producto del DOM
        })
        .catch(error => console.error('Error:', error));
      });
    });

    nuevoProducto.appendChild(imagen);
    nuevoProducto.appendChild(nombre);
    nuevoProducto.appendChild(precio);
    nuevoProducto.appendChild(botonEliminar);

    productoContainer.appendChild(nuevoProducto);
  }

  // Función para cargar productos
  function cargarProductos() {
    fetch('https://alurageek-xi-three.vercel.app/api/products')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cargar los productos');
      }
      return response.json();
    })
    .then(productos => {
      productos.forEach(producto => {
        agregarProductoAlDOM(producto);
      });
    })
    .catch(error => console.error('Error:', error));
  }

  // Función para mostrar el modal de confirmación
  function mostrarConfirmacion(productoAEliminar, callback) {
    const modalConfirmacion = document.getElementById('modal-confirmacion');
    modalConfirmacion.style.display = 'block';

    // Obtener las coordenadas del producto a eliminar
    const rect = productoAEliminar.getBoundingClientRect();
    modalConfirmacion.style.top = `${rect.top + window.scrollY}px`;
    modalConfirmacion.style.left = `${rect.left + window.scrollX}px`;

    const btnConfirmarEliminar = document.getElementById('btn-confirmar-eliminar');
    btnConfirmarEliminar.addEventListener('click', function() {
      modalConfirmacion.style.display = 'none';
      callback();
    });

    const btnCancelaEliminar = document.getElementById('btn-cancelar-eliminar');
    btnCancelaEliminar.addEventListener('click', function() {
      modalConfirmacion.style.display = 'none';
    });
  }

  // Inicializar la carga de productos al cargar la página
  cargarProductos();

  // Event listeners para estilizar inputs del formulario
  const inputs = document.querySelectorAll('.formulario-producto');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      input.classList.add('texto-ingresado');
    });
    input.addEventListener('blur', function() {
      if (input.value.trim() === '') {
        input.classList.remove('texto-ingresado');
      }
    });
  });

  // Función para eliminar producto predefinido (ejemplo)
  window.eliminarProductoPredefinido = function() {
    const productoPredefinido = document.querySelector('.producto-ejemplo');
    if (productoPredefinido) {
      productoContainer.removeChild(productoPredefinido);
    }
  };
});
