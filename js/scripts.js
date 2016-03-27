var scripts = [
	'utils/polyfill',
	'utils/baseUtils',
	'utils/arrayUtils',

	'settings/Settings',

	'components/Notifier',
	'components/PopUp',
	'components/Dialog',
	'components/Widget',
	'components/Paginator',
	'components/Window',
	'components/Button',
	'components/grid/DataGrid',
	'components/grid/ActionColumnsConfig',
	'components/grid/ActionColumn',
	'components/grid/RemoveColumn',
	'components/grid/EditColumn',
	'components/grid/CustomRow',
	'components/form/Form',
	'components/form/FormWindow',
	'components/form/FormItem',
	'components/form/TextField',
	'components/form/ComboBox',
	'components/form/DateField',
	'components/form/NumberField',

	'service/Service',

	'core/View',
	'core/ViewController',

	'app/main/JournalLayout',
	'app/main/Main',
	'app/main/MainController',

	'app/browser/Browser',
	'app/browser/BrowserController',

	'app/duties/Duties',
	'app/duties/DutiesController',
	'app/duties/ActiveDutyRow',

	'app/search/Search',
	'app/search/SearchController',

	'app/provisions/Provisions',
	'app/provisions/ProvisionsController',
	'app/provisions/ProvisionsForm',

	'app/accumulators/Accumulators',
	'app/accumulators/AccumulatorsController',
	'app/accumulators/AccumulatorForm',

	'app/statistics/Statistics',
	'app/statistics/StatisticsController',

	'app'
];

for (var index in scripts) {
	var path = scripts[index];
	document.write('<script src="js/' + path + '.js"></'+'script>');
}
