<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperar Contraseña</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="/css/main.css">
</head>

<body class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="max-w-md w-full mx-auto p-6">
        <div class="bg-white rounded-lg shadow-md p-8">
            <div class="text-center mb-8">
                <h1 class="text-2xl font-bold text-gray-800">Recuperar Contraseña</h1>
                <p class="text-gray-600 mt-2">Ingresa tu correo electrónico para recuperar tu contraseña</p>
            </div>

            <form action="/reset" method="POST" class="space-y-6">
                <!-- Campo de Email -->
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                    <input type="email"
                        id="email"
                        name="email"
                        required
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="ejemplo@correo.com">
                </div>

                <!-- Botón de Enviar -->
                <button type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Enviar Instrucciones
                </button>
            </form>

            <!-- Enlace para volver -->
            <div class="text-center mt-4">
                <a href="/login" class="text-sm text-blue-600 hover:text-blue-500">
                    Volver al inicio de sesión
                </a>
            </div>
        </div>
    </div>
</body>

</html>