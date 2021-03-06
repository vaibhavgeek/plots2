jQuery(document).ready(function($) {

  if (window.location.hash !== '') {
    var tagname = window.location.hash.replace('#', '');
    $('.topic-search input').val(tagname);
    showByTagname(tagname);
  }

  $('#topics a').each(function(i, el) {
    var tagname = $(el).attr('data-topic');
    $(el).click(function(e) {
      e.preventDefault();
      $('.topic-search input').val(tagname);
      showByTagname(tagname);
      window.location.hash = tagname;
    });
  });

  $('.topic-search input').on('keyup', submitTopicForm);
  // fetch based on URL hash too
  $('.topic-search').submit(submitTopicForm);

  function submitTopicForm(e) {
    e.preventDefault();
    var tagname = $('.topic-search input').val();
    // find matching tagnames in more complex ways -- not just exact matches
    // ... is there a jQuery way to find partial classname matches, like $('.node.tag-*') ?
    showByTagname(tagname);
    window.location.hash = tagname;
  }

  function showByTagname(tagname) {
    if (tagname !== "" && $('#methods .node.tag-' + tagname).length > 0) {
      $('#methods h2.recent').hide();
      $('#methods h2.related').show();
      $('#methods h2 .topic-title').html(tagname);
      $('#methods .node').hide();
      $('#methods .node.tag-' + tagname).show();
    } else {
      $('#methods .node').show();
      $('#methods .no-results').show();
      $('#methods h2.related').hide();
      $('#methods h2.recent').show();
    }
  }

});
