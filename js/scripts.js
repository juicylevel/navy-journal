var scripts = [
	'utils/polyfill',
	'utils/baseUtils',
	'utils/arrayUtils',

	'types/states',
	'types/frames',
	'types/events',
	'types/consts',
	'types/notifications',

	'core/Dispatcher',
	'core/Receiver',
	'core/Notification',
	'core/Model',
	'core/View',
	'core/Controller',

	'components/DataGrid',
	'components/JournalLayout',
	'components/Notifier',
	'components/Dialog',

	'service/Service',

	'modules/base/Settings',
	'modules/base/Module',

	'modules/journal/JournalView',
	'modules/journal/JournalModel',
	'modules/journal/JournalController',

	'app'
];

for (var index in scripts) {
	var path = scripts[index];
	document.write('<script src="js/' + path + '.js"></'+'script>');
}
