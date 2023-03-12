import create from "zustand";



export function User() {
    const [id, setId] = User.use((state) => [
        state.id,
        state.setId,
      ]);
    
    const [name, setName] = User.use((state) => [
    state.name,
    state.setName,
    ]);


}


export type User = {
    id: string;
    setId: (prompt: string) => void;
    name: string;
    setName: (prompt: string) => void;
  };
  
export namespace User {
    export const use = create<User>()((set) => ({
        id: "",
        setId: (id: string) => set((state: User) => ({ id })),
        name: "",
        setName: (name: string) => set((state: User)=> ({ name }))
    }));

    export const useUser = () => {
        const user = User.use((state) => state);
        return [user] as const;
      };
}



