# Challengue - Frontend

## Arquitectura de Autenticación

### Almacenamiento de Tokens

**Token de Acceso (Access Token):**
- Almacenado en **memoria** (variable JavaScript)
- Volátil: se elimina al cerrar la pestaña/navegador
- No persiste entre sesiones
- Implementado en `src/api/axios.instance.ts`

**Token de Actualización (Refresh Token):**
- Almacenado en cookies `httpOnly` (backend)
- No accesible desde JavaScript
- Gestionado automáticamente por el navegador

### ¿Por qué esta metodología?

1. **Seguridad**: Reduce el riesgo de ataques XSS
2. **Privacidad**: Los tokens no persisten en el dispositivo
3. **Mejores prácticas**: Alineado con OWASP recommendations


## Gestión de Estado entre Profile y ProfileEdit

### Flujo de Datos

**Vista Profile:**
- Realiza un `GET` para obtener los datos del perfil del usuario
- Los datos se almacenan en el store de Zustand (`user.store.ts`)

**Vista ProfileEdit:**
- **No debe realizar otro GET** - utiliza los datos ya almacenados en Zustand
- El formulario se inicializa con los datos del store
- Cuando el usuario guarda cambios (PATCH):
  - Se actualiza el perfil en el backend
  - Zustand actualiza automáticamente el estado local
  - Los datos se reflejan inmediatamente sin necesidad de otra petición HTTP

### ¿Por qué esta arquitectura?

1. **Eficiencia**: Evita peticiones HTTP redundantes
2. **Consistencia**: Una única fuente de verdad (Zustand store)
3. **Mejor UX**: Actualización instantánea de datos después de editar
4. **Optimización**: Reduce la carga en el servidor y mejora el rendimiento



USAR USEMUTATION RECORDAAARRRRRRRRR