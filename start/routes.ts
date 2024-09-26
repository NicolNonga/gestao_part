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
import DeleteVehilePartsController from '#controllers/delete_vehile_parts_controller'
const AllPartsController = () => import('#controllers/all_parts_controller')
const UpdateVehiclesController = () => import('#controllers/update_vehicles_controller')
const UpdateTypePartsController = () => import('#controllers/update_type_parts_controller')
const UpdateVehicleTypesController = () => import('#controllers/update_vehicle_types_controller')
const UpdatedSuppliersController = () => import('#controllers/updated_suppliers_controller')
const DownloadFilePartsController = () => import('#controllers/download_file_parts_controller')
const MovimentStockListsController = () => import('#controllers/moviment_stock_lists_controller')
const StockIndexController = () => import('#controllers/stock_indices_controller')
const SupplierDropdownListsController = () =>
  import('#controllers/supplier_dropdown_lists_controller')
const StockStoresController = () => import('#controllers/stock_stores_controller')
const SupplierIndexController = () => import('#controllers/supplier_indices_controller')
const VehiclePartStoresController = () => import('#controllers/vehicle_part_stores_controller')
const SupplierStoresController = () => import('#controllers/supplier_stores_controller')
const PartFindOnesController = () => import('#controllers/part_find_ones_controller')
const PartDeletesController = () => import('#controllers/part_deletes_controller')
const PartIndexController = () => import('#controllers/part_indices_controller')
const PartUpdatesController = () => import('#controllers/part_updates_controller')
const PartStoresController = () => import('#controllers/part_stores_controller')
const VehicleIndexController = () => import('#controllers/vehicle_indexs_controller')
const VehicleStoresController = () => import('#controllers/vehicle_stores_controller')
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
    router.get('/drop-down-list', [PermissionsController, 'dropDownList'])
    router.put('/:permissionId/enable', [PermissionsController, 'enable'])
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
    router.put('/', [RolePermissionsController, 'delete'])
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
    router.put('/:typeId', [UpdateTypePartsController, 'update'])
    router.get('/dropdown', [TypePartDropdownsController, 'index'])
  })
  .prefix('type_parts')
  .use(middleware.auth())
router
  .group(() => {
    router.post('/', [VehicleTypeStoresController, 'store'])
    router.get('/', [VehicleTypeIndexController, 'index'])
    router.put('/:vehicleTypeId', [UpdateVehicleTypesController, 'update'])
    router.get('/dropdown', [VehicleTypeDropdownsController, 'index'])
  })
  .prefix('vehicle_type')
  .use(middleware.auth())

router
  .group(() => {
    router.post('/', [VehicleStoresController, 'store'])
    router.get('/', [VehicleIndexController, 'index'])
    router.put('/:vehicleId', [UpdateVehiclesController, 'update'])
  })
  .prefix('vehicles')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/all', [AllPartsController, 'index'])
    router.post('/', [PartStoresController, 'store'])
    router.get('/', [PartIndexController, 'index'])
    router.put('/:partId', [PartUpdatesController, 'update'])
    router.delete('/:partId', [PartDeletesController, 'delete'])
    router.get('/:partId', [PartFindOnesController, 'findOne'])
    router.get('/download/file/:fileName', [DownloadFilePartsController, 'download'])
  })
  .prefix('parts')
  .use(middleware.auth())

router
  .group(() => {
    router.post('/', [VehiclePartStoresController, 'store'])
    router.post('/delete', [DeleteVehilePartsController, 'delete'])
  })
  .prefix('vehicle_part')
  .use(middleware.auth())

router
  .group(() => {
    router.post('/', [SupplierStoresController, 'store'])
    router.get('/', [SupplierIndexController, 'index'])
    router.get('/dropdown', [SupplierDropdownListsController, 'dropdown'])
    router.put('/:supplierId', [UpdatedSuppliersController, 'update'])
  })
  .prefix('supplier')
  .use(middleware.auth())

router
  .group(() => {
    router.post('/', [StockStoresController, 'store'])
    router.get('/', [StockIndexController, 'index'])
  })
  .prefix('stock')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [MovimentStockListsController, 'index'])
  })
  .prefix('moviment_stock')
  .use(middleware.auth())
