<?php
// Register Fields
$kirby->set('field',  'headlineaccordion', __DIR__ . DS . 'fields' . DS . 'headlineaccordion');

// Register Blueprints
$kirby->set('blueprint', 'fields/headlineaccordion', __DIR__ . '/headlineaccordion.yml');

// Register Panel Hooks
/*$hooks = ['panel.page.update'];
$kirby->set('hook', '*', function($page) {
  error_log($page->title());
});*/
