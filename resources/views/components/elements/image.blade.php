@php
  /**
   * Set a correct width and height to avoid visual shift
   *  Have the possibility to set width / height in the component or
   *  set object-fit cover if parent is sized
   * 
   * Enable lazyloading
   * 
   * Preload img in above the fold
   * 
   * Create a placeholder
  */
@endphp

<picture class='e-img'>
  {{-- Webp image --}}
  
  {{-- If webp is unsupported --}}
  <source 
    media="(min-width: 320px)"
    data-srcset=
    "@foreach ($srcset as $size => $url)
      {{$url . ' ' . $size}} @if(!$loop->last),@endif
    @endforeach"
    data-sizes="
    @if($sizes) 
      @foreach ($sizes as $size)
        {{$size}}
      @endforeach
    @endif
    100vw,
    "
  />

  {{-- Fallback in img element --}}
  <img 
    class='lazy'
    loading='lazy'
    data-src={{$srcset['320w']}} 
    alt="{{$alt}}" 
    width='800' 
    height='800'
    {{-- style='width:100%; height:100%' --}}
    />
  {{-- If webp is unsupported --}}
</picture>

