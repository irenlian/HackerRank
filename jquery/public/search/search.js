function setResidentsText() {
  const text = `${$("form [name='adults']").val()} adults`;
  $("#residents").text(text);
}

$(() => {
  $("#plate").hide();
  $("form [name='adults-minus']").click(() => {
    const input = $("form [name='adults']");
    input.val(parseInt(input.val(), 10) - 1);
    if (parseInt(input.val(), 10) === 1) {
      $("form [name='adults-minus']").attr("disabled", true);
    }
    setResidentsText();
  });
  $("form [name='adults-plus']").click(() => {
    const input = $("form [name='adults']");
    input.val(parseInt(input.val(), 10) + 1);
    if (parseInt(input.val(), 10) === 2) {
      $("form [name='adults-minus']").attr("disabled", false);
    }
    setResidentsText();
  });
  $("#residents").click(() => {
    $("#plate").toggle();
  });
});
