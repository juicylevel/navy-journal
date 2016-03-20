/**
 * Класс типов оповещений.
 */
 var Notifications = (function () {
     return {
         // типы оповещений ядра
         VIEW_READ: 'viewReady',

         // оповещения от сервиса
         LOAD_JOURNAL_STATUS: 'loadJournalStatus',
         LOAD_CONFIG_COMPLETE: 'loadConfigComplete',
         LOAD_JOURNAL_GRID_DATA: 'loadJournalGridData',
         CREATE_DUTY_COMPLETE: 'createDutyComplete',
         RUN_UP_COMPLETE: 'runUpComplete',
         DUTY_COMPLETE: 'dutyComplete',
         LOAD_DUTY_LIST: 'loadDutyList',

         // оповещения от системы навигации
         CALL_START_DUTY: 'callStartDuty',
         CALL_COMPLETE_RUN_UP: 'callCompleteRunUp',
         CALL_COMPLETE_DUTY: 'callCompleteDuty',

         CALL_INDEX_MODULE: 'callIndexModule',
         CALL_DUTY_MODULE: 'callDutyModule',
         CALL_STATISTICS_MODULE: 'callStatisticsModule',
         CALL_DICTIONARY_MODULE: 'callDictionaryModule',

         CALL_PROVISION_DATA: 'callProvisionData',
         CALL_ACCUMULATORS_DATA: 'callAccumalatorsData',
         CALL_MAIN_DUTY_DATA: 'callMainDutyData',
         CALL_WEATHER_DUTY_DATA: 'callWeatherDutyData',

         CALL_LOAD_DUTY_LIST: 'callLoadDutyList',

         // оповещения от модели журнала.
         CHANGE_LAST_DUTY_INFO: 'changeLastDutyInfo',
         CHANGE_ACTIVE_DUTY_INFO: 'changeActiveDutyInfo',

         CHANGE_ACTIVE_DUTY: 'changeActiveDuty',

         // оповещения для навигации
         CHANGE_SYSTEM_MENU: 'changeSystemMenu',
         CHANGE_MODULE_MENU: 'changeModuleMenu',

         CHANGE_MODULE: 'changeModule',

         // оповещения от модели фрейма с таблицей журналов
         CHANGE_JOURNAL_GRID_COLUMNS: 'changeJournalGridColumns',
         CHANGE_JOURNAL_GRID_ROWS: 'changeJournalGridRows',

         CHANGE_DUTY_LIST: 'changeDutyList',

         // оповещение о завершении загрузки информации об элементах и типах провизии
         LOAD_PROVISIONS_DATA: 'loadProvisionsData',

         LOAD_PROVISIONS_ITEMS: 'loadProvisionsItems',

         // оповещение об изменении списка элементов провизии
         CHANGE_PROVISIONS_ITEMS: 'changeProvisionsItems',

         // запрос на загрузку информации об элементах и типах провизии
         CALL_LOAD_PROVISIONS_DATA: 'callLoadProvisionsData',

         CALL_LOAD_PROVISIONS_ITEMS: 'callLoadProvisionsItems',

         // сохранение элемента провизии
         SAVE_PROVISIONS_ITEM: 'saveProvisionsItem',

         // оповещение о завершении сохранения элемента провизии на сервере
         COMPLATE_SAVE_PROVISIONS_ITEM: 'completeSaveProvisionsItem',

         // скрытие элемента провизии из списка
         HIDE_PROVISIONS_ITEM: 'hideProvisionsItem',

          // оповещение об изменении списка типов провизии
         CHANGE_PROVISIONS_TYPES: 'changeProvisionsTypes'
     };
})();
