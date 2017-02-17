
chrome.storage.local.get('name', function (items) {
	if (!items.name) {
		showChangeNamePanel();
	} else {
		$('#usrName').val(items.name);
		generateAndCopyTimestamp();
	}
});

$('#generateBtn').click(generateAndCopyTimestamp);

$('#changeNameBtn').click(showChangeNamePanel);

$('#saveBtn').click(function () {
    var name = $('#usrName').val();
    
    chrome.storage.local.set({ 'name': name }, function() {
        showSuccessMessage('Sauvegardé avec succès!');
		showGenerateTimestampPanel();
    });
});

$('#cancelBtn').click(function () {
    window.close();
})

function showGenerateTimestampPanel() {
	$('#timestampDiv').show();
	$('#changeNameDiv').hide();
	$('#saveBtn').hide();
	$('#generateBtn').show();
	$('#changeNameBtn').show();
}

function showChangeNamePanel() {
	$('#timestampDiv').hide();
	$('#changeNameDiv').show();
	$('#changeNameBtn').hide();
	$('#saveBtn').show();
	$('#generateBtn').hide();
}

function showSuccessMessage(message) {
	$('#messages')
		.html(message)
		.removeClass("text-danger")
		.addClass("text-success")
		.show();
}

function generateAndCopyTimestamp() {
	chrome.storage.local.get('name', function (items) {
        var timeStamp = '[' + items.name + ' ' + moment().format('DD-MM-YYYY @ HH:mm') + ']';
        $('#timestamp').val(timeStamp);
		
		$('#timestamp').focus();
		$('#timestamp').select();
		document.execCommand("copy")
		
        showSuccessMessage('Votre <i>timestamp</i> a été copié dans le presse papier.');
    });
}