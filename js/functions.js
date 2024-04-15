// Variavel com conteudo do Menu
const rightmenu = '<h3>Preferências</h3><ul data-role="listview"><li data-icon="delete"><a href="#" data-rel="close">&nbsp;Fechar Menu</a></li><li data-role="list-divider">Zoom</li><li data-role="collapsible" data-inset="false" data-iconpos="right"><li data-icon="plus"><a href="#" onclick="FonteMais()">&nbsp;Aumentar</a></li><li data-icon="minus"><a href="#" onclick="FonteMenos()">&nbsp;Diminuir</a></li></li><!-- /collapsible --><li data-role="list-divider">Tema</li><li data-role="collapsible" data-inset="false" data-iconpos="right"><li data-icon="eye"><a href="#" onclick="Noite()">&nbsp;Leitura</a></li><li data-icon="star"><a href="#" onclick="Dia()">&nbsp;Normal</a></li></li><!-- /collapsible --></ul>';

// Aumenta a fonte
const FonteMais = () => {
	curSize = parseInt($('#content').css('font-size')) + 2;
	if (curSize <= 40)
		$('#content').css('font-size', curSize);
	for (i = 1; i < 250; i++) {
		text = '#content' + i;
		$(text).css('font-size', curSize);
	}
}

// Diminui a fonte
const FonteMenos = () => {
	curSize = parseInt($('#content').css('font-size')) - 2;
	if (curSize >= 12)
		$('#content').css('font-size', curSize);
	for (i = 1; i < 250; i++) {
		text = '#content' + i;
		$(text).css('font-size', curSize);
	}
}

// Deixa texto escuro a fonte
const Noite = () => {
	$('#content').css('background-color', "#252525");
	$('#content').css('color', "#fff");
	$('#content').css('border-color', "#454545");
	$('#content').css('text-shadow', "0");
	for (i = 1; i < 250; i++) {
		text = '#content' + i;
		$(text).css('background-color', "#252525");
		$(text).css('color', "#fff");
		$(text).css('border-color', "#454545");
		$(text).css('text-shadow', "0");
	}
}

// Deixa texto claro novamente
const Dia = () => {
	location.reload();
}
