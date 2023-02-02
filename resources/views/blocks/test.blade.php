{{--
  Title: Test
  Description: Test
  Category: Theme blocks
  Icon: admin-tools
  Keywords: test
  Mode: edit
  Align: center
  PostTypes: page post
--}}

<section class="b-test" data-observe data-observe-offset='15%, 150' data-observe-call='test'>
  <x-title :data='$data'/>
    <div class="next">Next</div>
    <div class="prev">Prec</div>

    <div class="debug">Debug</div>

    <div class="b-test__slides">
      <div class="b-test__slide b-test__slide-1">
        <x-elements.image :id="$data['img']" alt='Ma première image'/>
        <div class="b-test__slide-name">Ma slide 1</div>
      </div>
      <div class="b-test__slide b-test__slide-2">
        <x-elements.image :id="$data['img']" alt='Ma première image'/>
        <div class="b-test__slide-name">Ma slide 2</div>
      </div>
      <div class="b-test__slide b-test__slide-3">
        <x-elements.image :id="$data['img']" alt='Ma première image'/>
        <div class="b-test__slide-name">Ma slide 3</div>
      </div>
    </div>
</section>