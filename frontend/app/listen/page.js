import Image from "next/image";
import React from "react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
  } from "@nextui-org/dropdown";
  import {Button, ButtonGroup} from "@nextui-org/button";



export default function Translate() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <h1>Upload Your MP3 Here:</h1>            
        <Dropdown>
            <DropdownTrigger>
                <Button 
                variant="bordered" 
                >
                Select a Language
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="eng">English</DropdownItem>
                <DropdownItem key="fr">French</DropdownItem>
                <DropdownItem key="cn">Chinese</DropdownItem>
                <DropdownItem key="jp">Japanese</DropdownItem>
                <DropdownItem key="kor">Korean</DropdownItem>
            </DropdownMenu>
        </Dropdown>
      </div>
    </main>
    
  );
}
