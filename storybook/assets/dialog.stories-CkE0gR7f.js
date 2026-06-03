import{t as e}from"./jsx-runtime-BjpsfUvM.js";import{a as t,c as n,i as r,n as i,o as a,r as o,s,t as c}from"./dialog-bg9pVdX3.js";import{t as l}from"./button-DTv0CXAF.js";var u=e(),d={title:`UI/Dialog`,component:c,tags:[`autodocs`]},f={render:()=>(0,u.jsxs)(c,{children:[(0,u.jsx)(n,{asChild:!0,children:(0,u.jsx)(l,{children:`Open Dialog`})}),(0,u.jsxs)(o,{children:[(0,u.jsxs)(a,{children:[(0,u.jsx)(s,{children:`Edit Profile`}),(0,u.jsx)(r,{children:`Make changes to your profile details here. Click save when you are finished.`})]}),(0,u.jsx)(`div`,{className:`py-4 text-sm text-slate-600`,children:`This is an example dialog body content where you would put forms or details.`}),(0,u.jsxs)(t,{children:[(0,u.jsx)(i,{asChild:!0,children:(0,u.jsx)(l,{variant:`outline`,children:`Cancel`})}),(0,u.jsx)(l,{type:`submit`,children:`Save Changes`})]})]})]})},p={args:{defaultOpen:!0},render:e=>(0,u.jsx)(c,{...e,children:(0,u.jsxs)(o,{children:[(0,u.jsxs)(a,{children:[(0,u.jsx)(s,{children:`System Notification`}),(0,u.jsx)(r,{children:`An automated database migration has been scheduled for tonight.`})]}),(0,u.jsx)(`div`,{className:`py-2 text-xs text-amber-700 bg-amber-50 border border-amber-100 p-3 rounded-lg`,children:`Please expect up to 5 minutes of intermittent service downtime.`}),(0,u.jsx)(t,{showCloseButton:!0})]})})};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile details here. Click save when you are finished.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-sm text-slate-600">
          This is an example dialog body content where you would put forms or details.
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    defaultOpen: true
  },
  render: args => <Dialog {...args}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>System Notification</DialogTitle>
          <DialogDescription>
            An automated database migration has been scheduled for tonight.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2 text-xs text-amber-700 bg-amber-50 border border-amber-100 p-3 rounded-lg">
          Please expect up to 5 minutes of intermittent service downtime.
        </div>
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
}`,...p.parameters?.docs?.source}}};var m=[`Default`,`OpenByDefault`];export{f as Default,p as OpenByDefault,m as __namedExportsOrder,d as default};