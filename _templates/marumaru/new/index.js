// npm run new:sfc -- --tag=p

module.exports = {
  prompt: ({ inquirer, args }) => {
    const questions = [
      {
        type: 'input',
        name: 'component_name',
        message: '🎉 What is the name of component? \n :e.g.; ListItem',
      },
      {
        type: 'input',
        name: 'container_name',
        message: '🚀 Which container does it belong to? \n :e.g.; If "ListItem" is under ListPage/, just type ListPage',
      },
      {
        type: 'confirm',
        name: 'have_props',
        message: '💍 Does it have props?',
      },
      {
        type: 'confirm',
        name: 'have_hooks',
        message: '🪝 Does it have hooks?',
      },
      {
        type: 'confirm',
        name: 'have_test',
        message: '🧪 Do you want to prepare a test for that?',
      },
    ]
    return inquirer.prompt(questions).then((answers) => {
      const { container_name, component_name, have_props} = answers
      const path = `${container_name}/${component_name}`
      const abs_path = `src/_components/${path}`
      const props = have_props ? '(props)' : '()'
      return {
        ...answers,
        path,
        abs_path,
        props,
      }
    })
  },
}
