<!doctype html>
<html <?php language_attributes(); ?>>
  @include('head')

  <body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
    <?php do_action('get_header'); ?>
    
    <div id="app">
      @include('sections.header')
        <x-navbar/>
        <x-menu/>

        <main id="main" class="main" data-taxi>
          <div data-taxi-view class='root'>
            @yield('content')

            <a style="display: block" href="/page-2/">Page 2</a>
            <a href="/page-1/">Page 1</a>
          </div>
        </main>

      @include('sections.footer')
    </div>

    <?php do_action('get_footer'); ?>
    <?php wp_footer(); ?>
  </body>
</html>

