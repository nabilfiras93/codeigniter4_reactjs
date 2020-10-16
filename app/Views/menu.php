<!-- Main Sidebar Container -->
<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="javascript:;" class="brand-link  text-center">
      <!-- <img src="/assets/kasir/logo.png" alt="Kasir Logo" class="brand-image img-circle elevation-3" style="opacity: .8"> -->
      <span class="brand-text font-weight-light">Kurs</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      
      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

          <li class="nav-item">
            <a href="<?= base_url().'/home/kurs' ?>" class="nav-link">
              <i class="nav-icon fas fa-info"></i>
              <p>
                Kurs
              </p>
            </a>
          </li>

          <li class="nav-item">
            <a href="<?= base_url().'/home/kurs_erate' ?>" class="nav-link">
              <i class="nav-icon fas fa-universal-access"></i>
              <p>
                Kurs Erate
              </p>
            </a>
          </li>

          <li class="nav-item">
            <a href="<?= base_url().'/home/usd_jual' ?>" class="nav-link">
              <i class="nav-icon fas fa-shower"></i>
              <p>
                USD Jual
              </p>
            </a>
          </li>

        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
</aside>