
var toggle_speed = 'fast';

function click_to_section(section_num) {
    $("#accordion").accordion("option", "disabled", false);
    $("#accordion").accordion("option", "active", section_num);
    $("#accordion").accordion("option", "disabled", true);

    $('html, body').animate({scrollTop: 200}, toggle_speed);
}

function activate_clickable_all() {
    $(".active").click(function() {
        set_step($(this).attr('id'));
    });
}

// текущий шаг. cart | passport | pay
var curr_step = 'cart';

function set_step(step_name) {
    if (step_name == curr_step) return;
    switch (step_name) {
        case 'cart':
            click_to_section(0);
            break;
        case 'passport':
            click_to_section(1);
            break;
        case 'pay':
            click_to_section(2);
            break;
    }
    curr_step = step_name;
}

$(function() {
    $("#accordion").accordion({
        autoHeight: false,
        disabled: true
    });
});