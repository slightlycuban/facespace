$(function() {
  var $github = $('#github');
  $.ajax({
    url: "https://api.github.com/users/slightlycuban/events/public?number=1",
    dataType: 'json',
    success: function(events) {
      var push = events[0];
      if (push.type !== "PushEvent") {
        return;
      }

      var commit = push.payload.commits[0];
      $github.append('<p id="message"><span class="sha">' + commit.sha.substr(0, 5) + '</span> <a href="' + commit.url + '">' + commit.message + '</a></p>');

      $.ajax({
        url: push.repo.url,
        dataType: 'json',
        success: function(repo) {
          $github.append('<p class="byline">In <a href="' + repo.html_url +'">' + repo.name + '</a></small>');
        }
      });
    }
  });

  $wordpress = $("#wordpress");
  $.ajax({
    url: 'https://public-api.wordpress.com/rest/v1/sites/exiledpenguin.wordpress.com/posts/?number=1&callback=?',
    dataType: 'json',
    success: function(feed) {
      var post = feed.posts[0];
      $wordpress.append('<p><a href="' + post.URL + '">' + post.title + '</a></small>');
      $wordpress.append('<p class="byline">On ' + new Date(post.date).toLocaleString() + '</small>')
    }
  });

  $so = $("#so");
  $.ajax({
    url: 'https://api.stackexchange.com/2.1/users/2372767/answers?page=1&pagesize=1&order=desc&sort=activity&site=stackoverflow',
    dataType: 'json',
    success: function(profile) {
      var answer = profile.items[0];

      $.ajax({
        url: 'https://api.stackexchange.com/2.1/questions/' + answer.question_id + '?order=desc&sort=activity&site=stackoverflow',
        dataType: 'json',
        success: function(results) {
          var question = results.items[0];
          $so.append('<p>In <a href="' + question.link + '">' + question.title + '</a></small>');
          $so.append('<p class="byline">With a score of ' + answer.score + '</small>');
        }
      });
    }
  });
});

$(document).ajaxError(function( event, jqxhr, settings, exception ) {
  console.log(event);
  console.log(exception);
  console.log(settings);
});

