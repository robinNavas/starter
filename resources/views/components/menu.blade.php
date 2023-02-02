<div class="menu">
  @if (isset($GLOBALS['menus']['main-menu']) && count($GLOBALS['menus']['main-menu']))
    @foreach ($GLOBALS['menus']['main-menu'] as $item)
      <a href="{{$item->url}}" class="menu__item">{{$item->title}}</a>  
    @endforeach 
  @endif
</div>