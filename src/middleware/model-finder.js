'use strict';

router.param('model', (req, res, next) => {
  console.log(`Using model: ${req.param.model}`);
});

export default (req, res, next) => {
  let model = req.params.model;
  if(model && models[model] && models[model].default) {
        
  }
};