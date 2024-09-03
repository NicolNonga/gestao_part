/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const LogsController = () => import('../app/controllers/logs_controller.js')
const AuthsController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')
import { middleware } from './kernel.js'
const TypePartDropdownsController = () => import('#controllers/type_part_dropdowns_controller')
const VehicleTypeDropdownsController = () =>
  import('#controllers/vehicle_type_dropdowns_controller')
const VehicleTypeIndexController = () => import('#controllers/vehicle_type_index_controller')
const VehicleTypeStoresController = () => import('#controllers/vehicle_type_stores_controller')
const TypePartsIndicesController = () => import('#controllers/type_parts_indices_controller')
const TypePartStoresController = () => import('#controllers/type_part_stores_controller')
const IndexClientsController = () => import('#controllers/index_clients_controller')
const StoreClientesController = () => import('#controllers/store_clientes_controller')
const PermissionsController = () => import('#controllers/permissions_controller')
const RolesController = () => import('#controllers/roles_controller')
const RolePermissionsController = () => import('#controllers/role_permissions_controller')

router.post('/log', [LogsController, 'store'])
router.get('/log', [LogsController, 'index'])
router.get('/logs/dashboard', [LogsController, 'dashboard'])
router.put('/log/:log_id/update-stay-period', [LogsController, 'update'])
router.post('/auth', [AuthsController, 'store'])

router
  .group(() => {
    router.post('/', [UsersController, 'store'])
    router.get('/', [UsersController, 'index']).use(middleware.auth())
    router.put('/new_password', [UsersController, 'changePassword']).use(middleware.auth())
    router.put('/:userId/desable', [UsersController, 'desable']).use(middleware.auth())
    router.put('/:userId/enable', [UsersController, 'enable']).use(middleware.auth())
    router.put('/:userId/redefinar_senha', [UsersController, 'setNewPassword'])
  })
  .prefix('users')

router
  .group(() => {
    router.put('/:permissionId/desable', [PermissionsController, 'desable'])
    router.post('/', [PermissionsController, 'store'])
    router.get('/', [PermissionsController, 'index'])
  })
  .prefix('permission')
  .use(middleware.auth())

router
  .group(() => {
    router.post('/', [RolesController, 'store'])
    router.get('/', [RolesController, 'index'])
    router.get('/list-dropdown', [RolesController, 'dropDownList'])
    router.put('/:roleId/desable', [RolesController, 'desable'])
    router.put('/:roleId/enable', [RolesController, 'enable'])
  })
  .prefix('roles')
  .use(middleware.auth())

router
  .group(() => {
    router.post('/', [RolePermissionsController, 'store'])
    router.delete('/', [RolePermissionsController, 'delete'])
  })
  .prefix('roles_permission')
  .use(middleware.auth())

router
  .group(() => {
    router.post('/', [StoreClientesController, 'store'])
    router.get('/', [IndexClientsController, 'index'])
  })
  .prefix('client')
  .use(middleware.auth())

router
  .group(() => {
    router.post('/', [TypePartStoresController, 'store'])
    router.get('/', [TypePartsIndicesController, 'index'])
    router.get('/dropdown', [TypePartDropdownsController, 'index'])
  })
  .prefix('type_parts')
  .use(middleware.auth())
router
  .group(() => {
    router.post('/', [VehicleTypeStoresController, 'store'])
    router.get('/', [VehicleTypeIndexController, 'index'])
    router.get('/dropdown', [VehicleTypeDropdownsController, 'index'])
  })
  .prefix('vehicle_type')
  .use(middleware.auth())
