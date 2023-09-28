import { Routes } from '@angular/router';

export const content: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
 
 



  {
    path: 'delivery',
    loadChildren: () => import('../../components/delivery/deliveryboy.module').then(m => m.DeliveryBoyModule),
  },
  {
    path: 'manifestmanagement',
    loadChildren: () => import('../../components/manifest-management/manifest-management.module').then(m => m.ManifestManagementModule),
  },
  {
    path: 'pos',
    loadChildren: () => import('../../components/pos/pos.module').then(m => m.POSModule),
  },
  {
    path: 'products',
    loadChildren: () => import('../../components/products/products.module').then(m => m.ProductsModule),
    data: {
      breadcrumb: "Products"
    }
  },
  {
    path: 'sales',
    loadChildren: () => import('../../components/sales/sales.module').then(m => m.SalesModule),
    data: {
      breadcrumb: "Sales"
    }
  },
  {
    path: 'coupons',
    loadChildren: () => import('../../components/coupons/coupons.module').then(m => m.CouponsModule),
    data: {
      breadcrumb: "Coupons"
    }
  },
  {
    path: 'users',
    loadChildren: () => import('../../components/users/users.module').then(m => m.UsersModule),
    data: {
      breadcrumb: "Users"
    }
  },
  {
    path: 'vendorsmanagement',
    loadChildren: () => import('../../components/vendorsmanagement/vendors.module').then(m => m.VendorsModule),
    data: {
      breadcrumb: "Vendors"
    }
  },
  {
    path: 'pages',
    loadChildren: () => import('../../components/pages/pages.module').then(m => m.PagesModule),
    data: {
      breadcrumb: "Pages"
    }
  },
  {
    path: 'reports',
    loadChildren: () => import('../../components/reports/reports.module').then(m => m.ReportsModule),
  },
  {
    path: 'partnership',
    loadChildren: () => import('../../components/reports1/reports.module').then(m => m.ReportsModule1),
  },
  {
    path: 'discount',
    loadChildren: () => import('../../components/discount/discount.module').then(m => m.DiscountModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('../../components/notifications/notifications.module').then(m => m.PushNotificationsModule)
  },



{
  path: 'approved',
  loadChildren: () => import('../../components/approved/approved.module').then(m => m.ApprovedProductModule)
},

  {
    path: 'settings',
    loadChildren: () => import('../../components/setting/setting.module').then(m => m.SettingModule),
    data: {
      breadcrumb: "Settings"
    }
  },
  {
    path: 'franchise',
    loadChildren: () => import('../../components/franchise/franchise.module').then(m => m.FranchiseModule),
    data: {
      breadcrumb: "Franchise"
    }
  },
  {
    path: 'upload',
    loadChildren: () => import('../../components/upload/upload.module').then(m => m.UploadModule),
    data: {
      breadcrumb: "upload"
    }
  },


  {
    path: 'master',
    loadChildren: () => import('../../components/master/master.module').then(m => m.MasterModule),
    data: {
      breadcrumb: "upload"
    }
  },
];