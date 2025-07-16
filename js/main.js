
// debounce関数
function debounce(func, wait) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


// menu
$(window).on("load resize", debounce(function() {

			//小さな端末用
			if(window.innerWidth < 900) {	// ※ここがブレイクポイント指定箇所です
				$('body').addClass('s').removeClass('p');
				$('#menubar').addClass('d-n').removeClass('d-b');
				$('#menubar_hdr').removeClass('d-n ham').addClass('d-b');
				
			//大きな端末用
			} else {
				$('body').addClass('p').removeClass('s');
				$('#menubar').addClass('d-b').removeClass('d-n');
				$('#menubar_hdr').removeClass('d-b').addClass('d-n');
			}

}, 5));


//ハンバーガーメニューをクリックした際の処理
$(function() {
	$('#menubar_hdr').click(function() {
		$(this).toggleClass('ham');

			if($(this).hasClass('ham')) {
				$('#menubar').addClass('d-b');
			} else {
				$('#menubar').removeClass('d-b');
			}

	});
});


// 同一ページへのリンクの場合に開閉メニューを閉じる処理
$(function() {
	$('#menubar a[href^="#"]').click(function() {
		$('#menubar').removeClass('d-b');
		$('#menubar_hdr').removeClass('ham');
	});
});


//ドロップダウンの親liタグ
$(function() {
    $('#menubar a[href=""]').click(function() {
		return false;
    });
});


//ドロップダウンメニューの処理
$(function() {

	$('#menubar li:has(ul)').addClass('ddmenu_parent');
	$('.ddmenu_parent > a').addClass('ddmenu');

		//タッチデバイス用
		$('.ddmenu').on('touchstart', function() {
			$(this).next('ul').stop().slideToggle();
			$('.ddmenu').not(this).next('ul').slideUp();
			return false;
		});

		//PC用
		$('.ddmenu_parent').hover(function() {
			$(this).children('ul').stop().slideDown();
		}, function() {
			$(this).children('ul').stop().slideUp();
		});

});


//ドロップダウンをページ内リンクで使った場合に、ドロップダウンを閉じる。
$(function() {
	$('.ddmenu_parent ul a').click(function() {
		$('.ddmenu_parent ul').slideUp();
	});
});


// スムーススクロール（※バージョン2024-1）※ヘッダーの高さとマージンを取得する場合。
$(function() {
    var headerHeight = $('header').outerHeight();
    var headerMargin = parseInt($('header').css("margin-top"));
    var totalHeaderHeight = headerHeight + headerMargin;
    var topButton = $('.pagetop'); // ページ上部に戻るボタンのセレクター
    var scrollShow = 'pagetop-show'; // ボタン表示用のクラス

    // スムーススクロールを実行する関数
    function smoothScroll(target) {
        var scrollTo = target === '#' ? 0 : $(target).offset().top - totalHeaderHeight;
        $('html, body').animate({scrollTop: scrollTo}, 500);
    }

    // ページ内リンク & ページトップへのスムーススクロール
    $('a[href^="#"], .pagetop').click(function(e) {
        e.preventDefault();
        var id = $(this).attr('href') || '#';
        smoothScroll(id);

        // スクロール後のハッシュ更新を適用
        if (id !== '#') {
            setTimeout(function() {
                window.location.hash = id;
            }, 100);
        }
    });

    // ボタンの表示/非表示
    $(topButton).hide();
    $(window).scroll(function() {
        if($(this).scrollTop() >= 300) {
            $(topButton).fadeIn().addClass(scrollShow);
        } else {
            $(topButton).fadeOut().removeClass(scrollShow);
        }
    });

    // ページロード時にURLのハッシュが存在する場合のスムーススクロール
    if(window.location.hash) {
        $('html, body').scrollTop(0); // ページの最上部に即時スクロール
        setTimeout(function() {
            smoothScroll(window.location.hash);
        }, 10);
    }
});


// 汎用開閉処理
$(function() {
	$('.openclose').next().hide();
	$('.openclose').click(function() {
		$(this).next().slideToggle();
		$('.openclose').not(this).next().slideUp();
	});
});
